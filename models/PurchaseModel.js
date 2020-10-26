const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const purchaseSchema = new Schema({
    products: [{type: Schema.Types.ObjectId, ref: 'products', required: true}],
    createdAt: {type: Date, required: true, default: new Date()},
    deletedAt: {type: Date, default: null, required: true}
});

const purchaseModel = mongoose.model('PurchaseModel',purchaseSchema);

module.exports = purchaseModel;