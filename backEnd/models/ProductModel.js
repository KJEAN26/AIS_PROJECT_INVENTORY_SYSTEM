const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const  productSchema = new Schema({
    productName: {type: String, required: true},
    productPrice: {type: Number, required: true},
    createdAt: {type: Date, default: new Date()},
    purchasedDate: {type: Date, default: null},
    deletedAt: {type: Date, default: null}
}, {
    collection: 'products'
});

const productModel = mongoose.model('ProductModel', productSchema);

module.exports = productModel;
