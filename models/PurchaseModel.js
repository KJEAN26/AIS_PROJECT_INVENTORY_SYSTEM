const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//create purchase schema
const purchaseSchema = new Schema({
    products: [{type: Schema.Types.ObjectId, ref: 'products', required: true}],
    createdAt: {type: Date, required: true, default: new Date()},
    deletedAt: {type: Date, default: null}
});

//create purchase model
const purchaseModel = mongoose.model('PurchaseModel',purchaseSchema);

//export purchase model
module.exports = purchaseModel;