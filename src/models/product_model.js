const mongoose = require("mongoose")
const Schema = mongoose.Schema

const products_schema = new Schema({
    imagePath: {
        type: String,
        required: true,
        trim:true
    },
    title: {
        type: String,
        required: true,
        trim:true
    },
    price: {
        type: Number,
        required: true
    },
    price_description: {
        type: String,
        trim:true,
        default:""
    },
    product_description: {
        type: String,
        required: true,
        trim:true
    },
    category:{
        type:String,
        required:true,
        trim:true
    },
    is_deleted:{
        type:Boolean,
        required:true,
        default:false
    }
    

})

module.exports = {
    product:mongoose.model("product", products_schema)
}
