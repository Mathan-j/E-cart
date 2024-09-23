const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    productName: {
        type: String,
        required: true
    },
    productDescription: {
        type: String,
        required: true
     },
    productPrice: {
        type: Number,
        required: true
    },
    productQuantity: {
        type: Number,
        required: true
    },
    productCategory: {
        type: String,
        required: true,
        enum:["laptop","mobile","desktop","tablet"]
    },
    productImage: {
        type: String,
        required: true
    }
})

const Product = mongoose.model("Product",productSchema);
module.exports = Product;