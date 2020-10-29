const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//get the path
const path = require('path');
const basePath = path.dirname(__dirname);


const productSchema = new Schema({
    productName: { type: String, required: true },
    productPrice: { type: Number, required: true },
    productImage: {type: String, default: `${basePath}static/image/default.png`},
    category: { type: String, enum: ['gadgets', 'grocery', 'clothes'], required: true },
    quantity: { type: String, default: 0, required: true },
    createdAt: { type: Date, default: new Date() },
    purchasedDate: { type: Date, default: null },
    deletedAt: { type: Date, default: null },
}, {
    collection: 'products'
});

const productModel = mongoose.model('ProductModel', productSchema);

module.exports = productModel;
