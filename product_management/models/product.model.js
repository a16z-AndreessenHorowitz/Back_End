const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    title: String,
    description:String,
    category: String,
    price: Number,
    discountPercentage:Number,
    status: String,
    stock: Number,
    thumbnail: String,
    deleted: Boolean,
    position:Number,
    deletedAt: Date
});

const Product = mongoose.model('Product', productSchema,'products');

module.exports = Product;