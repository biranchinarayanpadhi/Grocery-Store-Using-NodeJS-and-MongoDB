const mongoose = require("mongoose")

mongoose.connect("mongodb://127.0.0.1:27017/grocery_delivery", {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
})
