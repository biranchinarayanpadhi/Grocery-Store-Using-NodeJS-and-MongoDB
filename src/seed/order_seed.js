require("../db/db_connection")
const mongoose = require("mongoose")
const order = require("../models/order_model").orders
const orderid = require("order-id")("my-secret")

const orders = [
    new order({

        orderId: orderid.generate(),
        user_email: "biranchi@gmail.com",
        user_name: "Biranchi Narayan Padhi",
        products: [
            {
                title: "Burt's Bees Natural Moisturizing Lip Balm",
                quantity: 3,
                category: "personalcare",
                total_product_price: 30,
                imagePath:"/images/personalcare/burstbees.jpg"
            },
            {
                title: "Bananas",
                quantity: 4,
                category: "fruits",
                imagePath:"/images/fruits/bananas.jpeg",
                total_product_price: 0.76
            }
        ],
        user_address: "XYZ Nagar 3rd Lane",
        user_zipcode: 765001,
        user_country: "India",
        user_state: "Odisha",
        total_price: 30.76,
        payment_status: true,
        date: "12-12-2020",
        time: "12:30"
    }),
    
    new order({

        orderId: orderid.generate(),
        user_email: "vishalpuri@gmail.com",
        user_name: "Vishal Puri",
        products: [
            {
                title: "CeraVe Moisturizing Cream ",
                quantity: 1,
                category: "personalcare",
                imagePath:"/images/personalcare/cerave_cream.jpg",
                total_product_price: 17.78
            },
            {
                title: "Clementines, 3lb bag",
                quantity: 2,
                category: "fruits",
                imagePath:"/images/fruits/clementines.jpeg",
                total_product_price: 6.88
            }
        ],
        user_address: "XYZ connot place",
        user_zipcode: 515001,
        user_country: "India",
        user_state: "Delhi",
        total_price: 24.66,
        payment_status: true,
        date: "10-23-2020",
        time: "00:30"

    }),
    new order({

        orderId: orderid.generate(),
        user_email: "mostafa@gmail.com",
        user_name: "Mostafa",
        products: [
            {
                title: "Yellow Nectarines, each",
                quantity: 10,
                category: "fruits",
                imagePath:"/images/fruits/yellow_nectarines.jpeg",
                total_product_price: 14.8
            },
            {
                title: "Marketside Chicken Caesar Salad Bowl 6.25 oz",
                imagePath:"/images/vegetables/marketside_chicken_ceasar_salad_bowl.jpeg",
                quantity: 2,
                category: "vegetables",
                total_product_price: 5.88
            }
        ],
        user_address: "Apt 7634, Pradera",
        user_zipcode: 412000,
        user_country: "United States",
        user_state: "Texas",
        total_price: 20.68,
        payment_status: true,
        date: "2-21-2020",
        time: "09:30"

    })
]
for (var i = 0; i < orders.length; i += 1) {
    orders[i].save()
}

