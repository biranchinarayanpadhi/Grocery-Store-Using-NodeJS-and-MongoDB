const express = require('express');
const path = require('path');
const hbs = require('hbs');
const orderId = require('order-id')('mysecret');
const products = require("./src/models/product_model").product;
const orders = require("./src/models/order_model").orders;
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const multer = require("multer")
const fs = require("fs")

var Cart = require("./src/models/cart");
const session = require('express-session');
const flash = require('connect-flash');
var MongoStore = require('connect-mongo')(session);
const methodOverride = require("method-override");
var validator = require('express-validator');

const mongoose = require("mongoose");
const { product } = require('./src/models/product_model');
require("./src/db/db_connection");
require('./config/passport');

const app = express();
const port = process.env.PORT || 3000;

// for customizing directories
const publicDirectoryPath = path.join(__dirname, "/public");
const viewsDirectory = path.join(__dirname, "src/views");
const partialsPath = path.join(__dirname, "src/views/partials");

var csrf = require('csurf');
var csrfProtection = csrf();
var passport = require('passport');

const upload = multer({
    dest: path.join(__dirname, "/public/images/")
    // you might also want to set some limits: https://github.com/expressjs/multer#limits
});


//setting the properties for express
app.set('view engine', '.hbs');
app.set('views', viewsDirectory);

hbs.registerPartials(partialsPath);

app.use(express.static(publicDirectoryPath));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(validator());
app.use(cookieParser());
app.use(express.json())
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true,
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
    cookie: { maxAge: 60 * 60 * 1000 } //persist the session for 60 minutes (converted into milliseconds)
}));
app.use(flash());

app.use(function (req, res, next) {
    res.locals.session = req.session;
    next();
});

app.use(methodOverride("_method"))
app.use(passport.initialize());
app.use(passport.session());

app.use(function (req, res, next) {
    res.locals.login = req.isAuthenticated();
    next();
});

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
  

//root route - returns all products
app.get("/", async (req, res) => {
    try {
        const itemLimit = 15;   //no. of items to display on each page
        const { page = 1, limit = itemLimit } = req.query;
        var totalPages = 1;

        //get the total no. of all items
        await products.countDocuments({ is_deleted: false }, function (error, counts) {
            totalPages = Math.ceil(counts / itemLimit);

        });

        await products.find({ is_deleted: false }).limit(itemLimit * 1).skip((page - 1) * limit).then((result) => {
            var productChunks = [];
            var chunkSize = 3;

            for (var i = 0; i < result.length; i += chunkSize) {
                productChunks.push(result.slice(i, i + chunkSize));
            }

            res.render("index", { product: productChunks, pagination: totalPages, user: req.user });

        });

    }

    catch (error) {
        res.status(500).send(error);
    }

});

app.get("/user/logout", isLoggedIn, function (req, res, next) {
    req.logout();
    req.session.destroy();
    res.redirect('/user/signin');
});

app.get("/user/signup", function (req, res, next) {
    var messages = req.flash('error');
    res.render('user/signup', {  isadmin: true, messages: messages, hasErrors: messages.length > 0 });
});

app.get("/user/signin", function (req, res, next) {
    var messages = req.flash('error');
    res.render('user/signin', {  messages: messages, hasErrors: messages.length > 0 });
});

app.post("/user/signup", passport.authenticate('local.signup', {
    successRedirect: '/',
    failureRedirect: '/user/signup',
    failureFlash: true
}));

app.post("/user/signin", passport.authenticate('local.signin', {
    successRedirect: '/',
    failureRedirect: '/user/signin',
    failureFlash: true
}));

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/user/signin');
}

function notLoggedIn(req, res, next) {
    if (!req.isAuthenticated()) {
        return next();
    }
    res.redirect('/');
}


//route to return results based on search/filter criteria
app.get("/search-filter", async (req, res) => {
    try {
        const itemLimit = 15;   //no. of items to display on each page
        const { page = 1, limit = itemLimit } = req.query;
        var totalPages = 1;

        var minPrice;
        var maxPrice;

        if (req.query.minPrice && req.query.maxPrice) {
            minPrice = parseInt(req.query.minPrice);
            maxPrice = parseInt(req.query.maxPrice);
        }

        if (req.query.itemTitle && !req.query.categories) {
            var itemTitle = req.query.itemTitle;

            //get the total no. of items in the searched result
            await products.countDocuments({
                $and: [{ title: { $regex: itemTitle, $options: "i" } },
                { price: { $gte: minPrice, $lte: maxPrice } }, { is_deleted: false }]
            }, function (error, counts) {

                totalPages = Math.ceil(counts / itemLimit);

            });

            await products.find({
                $and: [{ title: { $regex: itemTitle, $options: "i" } },
                { price: { $gte: minPrice, $lte: maxPrice } },
                { is_deleted: false }]
            }).limit(itemLimit * 1).skip((page - 1) * limit).then((result) => {

                var productChunks = [];
                var chunkSize = 3;

                for (var i = 0; i < result.length; i += chunkSize) {
                    productChunks.push(result.slice(i, i + chunkSize));
                }

                res.render("index", { product: productChunks, pagination: totalPages });

            });
        }

        else if (req.query.itemTitle && req.query.categories) {
            var itemTitle = req.query.itemTitle;
            var categoriesStr = req.query.categories;
            var categoriesArr = categoriesStr.toLowerCase().split(",");

            //get the total no. of items in the searched result
            await products.countDocuments({
                $and: [{ title: { $regex: itemTitle, $options: "i" } },
                { price: { $gte: minPrice, $lte: maxPrice } },
                { category: categoriesArr },
                { is_deleted: false }]
            }, function (error, counts) {

                totalPages = Math.ceil(counts / itemLimit);

            });

            await products.find({
                $and: [{ title: { $regex: itemTitle, $options: "i" } },
                { price: { $gte: minPrice, $lte: maxPrice } },
                { category: categoriesArr },
                { is_deleted: false }]
            }).limit(itemLimit * 1).skip((page - 1) * limit).then((result) => {

                var productChunks = [];
                var chunkSize = 3;

                for (var i = 0; i < result.length; i += chunkSize) {
                    productChunks.push(result.slice(i, i + chunkSize));
                }

                res.render("index", { product: productChunks, pagination: totalPages });

            });
        }

        else if (!req.query.itemTitle && req.query.categories) {
            var categoriesStr = req.query.categories;
            var categoriesArr = categoriesStr.toLowerCase().split(",");

            //get the total no. of items in the searched result
            await products.countDocuments({
                $and: [{ price: { $gte: minPrice, $lte: maxPrice } },
                { category: categoriesArr },
                { is_deleted: false }]
            }, function (error, counts) {

                totalPages = Math.ceil(counts / itemLimit);

            });

            await products.find({
                $and: [{ price: { $gte: minPrice, $lte: maxPrice } },
                { category: categoriesArr },
                { is_deleted: false }]
            }).limit(itemLimit * 1).skip((page - 1) * limit).then((result) => {

                var productChunks = [];
                var chunkSize = 3;

                for (var i = 0; i < result.length; i += chunkSize) {
                    productChunks.push(result.slice(i, i + chunkSize));
                }

                res.render("index", { product: productChunks, pagination: totalPages });

            });
        }

        else if (req.query.minPrice && req.query.maxPrice && !req.query.itemTitle && !req.query.categories) {

            //get the total no. of items in the searched result
            await products.countDocuments({
                $and: [{ price: { $gte: minPrice, $lte: maxPrice } },
                { is_deleted: false }]
            }, function (error, counts) {

                totalPages = Math.ceil(counts / itemLimit);

            });

            await products.find({
                $and: [{ price: { $gte: minPrice, $lte: maxPrice } },
                { is_deleted: false }]
            }).limit(itemLimit * 1).skip((page - 1) * limit).then((result) => {

                var productChunks = [];
                var chunkSize = 3;

                for (var i = 0; i < result.length; i += chunkSize) {
                    productChunks.push(result.slice(i, i + chunkSize));
                }

                res.render("index", { product: productChunks, pagination: totalPages });

            });
        }

    }

    catch (error) {
        res.status(500).send(error);
    }

});


//route to add products to the shopping cart
app.get('/add-to-cart/:id/:qty', async (req, res) => {
    var productId = req.params.id;
    var qty = parseInt(req.params.qty);
    var cart = new Cart(req.session.cart ? req.session.cart.items : {});

    await products.findOne({ _id: productId }, function (err, product) {
        cart.add(product, productId, qty);
        req.session.cart = cart;
        res.sendStatus(200);
    });

});

//route to render the shopping cart page
app.get('/cart', async (req, res) => {
    if (!req.session.cart) {
        return res.render('cart', { products: null });
    }
    var cart = new Cart(req.session.cart.items);
    res.render('cart', {  products: cart.lookupItems(), totalPrice: parseFloat(cart.totalPrice).toFixed(2) });
});

//route to render the checkout page
app.post('/checkout', function (req, res) {
    if (!req.session.cart) {
        return res.render('cart', {  products: null });
    }

    var productArray = req.body.products;
    var grandTotal = req.body.grandTotal;
    res.render('checkout', {  grandTotal: grandTotal, products: productArray });

});

//route to return products from chosen category
app.get("/:category", async (req, res) => {
    try {
        const itemLimit = 15;   //no. of items to display on each page
        const { page = 1, limit = itemLimit } = req.query;
        var totalPages = 1;

        //get the total no. of items in the chosen category
        await products.countDocuments({ $and: [{ category: req.params.category }, { is_deleted: false }] }, function (error, counts) {
            totalPages = Math.ceil(counts / itemLimit);
        });

        await products.find({ $and: [{ category: req.params.category }, { is_deleted: false }] }).limit(itemLimit * 1).skip((page - 1) * limit).then((result) => {
            var productChunks = [];
            var chunkSize = 3;

            for (var i = 0; i < result.length; i += chunkSize) {
                productChunks.push(result.slice(i, i + chunkSize));
            }

            res.render("index", { product: productChunks, pagination: totalPages });

        });

    }
    catch (error) {
        res.status(500).send(error);
    }

});

//route to admin add page
app.get("/admin/add", isLoggedIn, (req, res) => {
    res.render("admin_add_product");

})

//route for adding a new product by admin
app.post("/products/add", upload.single("file"), async (req, res) => {
    if (req.file) {

        const handleError = (err, res) => {
            res.status(500).contentType("text/plain").end("Oops! Something went wrong!");
        };

        const tempPath = req.file.path;
        const targetPath = path.join(__dirname, "/public/images/" + req.body.category + "/" + req.body.image_name)
        fs.rename(tempPath, targetPath, err => {
            if (err) return handleError(err, res);
        });
    }

    const imagePath = "/images/" + req.body.category + "/" + req.body.image_name;
    const add_product = new products({

        title: req.body.title,
        category: req.body.category,
        imagePath: imagePath,
        price: req.body.price,
        price_description: req.body.price_description,
        product_description: req.body.price_description

    })

   await add_product.save().then((result) => {
        res.redirect("/" + req.body.category);
    }).catch((error) => {
        res.send(error)
    })
})


//route to show a particular product details for admin
app.get("/products/:id/show", isLoggedIn, (req, res) => {
    products.findById({ _id: req.params.id }).then((product) => {
        res.render("admin_show_product", {  product: product })
    }).catch((error) => {
        res.status(500).send(error)
    })
})


//route to admin edit page for editing particular product details
app.get("/products/:id", isLoggedIn, (req, res) => {
    products.findById({ _id: req.params.id }).then((product) => {

        res.render("admin_edit_product", { product })

    }).catch((error) => {
        res.status(500).send(error)
    })
})


//route to update the product details
app.put("/products/:id", isLoggedIn, upload.single("file"), (req, res) => {


    if (req.file) {

        const handleError = (err, res) => {
            res.status(500).contentType("text/plain").end("Oops! Something went wrong!");
        };

        var words = req.body.imagePath.split("/")
        const tempPath = req.file.path;
        const targetPath = path.join(__dirname, "/public/images/" + req.body.category + "/" + words[words.length - 1])
        fs.rename(tempPath, targetPath, err => {
            if (err) return handleError(err, res);
        });

    }

    products.updateOne({ _id: req.params.id },

        {
            $set: {
                title: req.body.title,
                category: req.body.category,
                imagePath: req.body.imagePath,
                product_description: req.body.product_description,
                price_description: req.price_description,
                price: req.body.price,
                is_deleted: req.body.is_deleted

            }
        }).then((product) => {

            res.redirect("/")

        }).catch((error) => {

            res.status(500).send(error)

        })
})

//route for soft delete
app.delete("/products/:id/", isLoggedIn, (req, res) => {
    products.updateOne({ _id: req.params.id }, {
        $set: {

            is_deleted: true
        }
    }).then((product) => {

        res.redirect("/");

    }).catch((error) => {
        res.status(500).send(error)
    })
})

//route to get the admin update page
app.get("/admin/update", isLoggedIn, (req, res) => {

    res.render("admin_search_filter_product");

})

//route for search and filtering functionality for admin
app.post("/products/search", isLoggedIn, (req, res) => {

    const title = req.body.title
    const category = req.body.category

    if (category === "all") {
        products.find({ title: { $regex: title, $options: "i" } }).then((products) => {
            res.json(products)
        }).catch((error) => {
            res.json(error)
        })
    }

    else {
        product.find({ title: { $regex: title }, category: { $regex: category } }).then((products) => {
            res.send(products)
        }).catch((error) => {
            res.send(error)
        })
    }
})

//route to save order details after checkout 
app.post("/checkout/submitOrder", async (req, res) => {
    const order_details = req.body;
    order_details["orderId"] = orderId.generate();
    order_details["products"] = JSON.parse(req.body.products);  //convert string to JSON object before pushing to DB
    const new_order = new orders(order_details)

    await new_order.save().then(() => {
        res.render("show_order", { order: order_details });
        delete req.session['cart'];    //delete items from cart

    }).catch((error) => {
        res.status(500).send(error);
    })

});

//route to display order details when a user clicks on a particular order history
app.get("/orders/history/:orderId", isLoggedIn, async (req, res) => {
    await orders.findOne({ orderId: req.params.orderId }).then((order) => {
        res.render("existing_order", { order: order })
    })
})

//route to display order history for a particular user
app.get("/orders/:username", isLoggedIn, (req, res) => {
    orders.find({ user_email: req.params.username }).then((orders) => {
        res.render("order_history", { order: orders })
    }).catch((error) => {
        res.status(500).send(error)
    })
})

app.listen(port, () => {
    console.log('Server is up on port ' + port);
});
