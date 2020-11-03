const mongoose = require('mongoose');
const Schema = mongoose.Schema;


//create transaction schema
const transactionShema = new Schema({
    purchaseId: { type: Schema.Types.ObjectId, ref: 'purchases' },
    userId: { type: Schema.Types.ObjectId, ref: 'users', required: true },
    transactDescript: { type: String },
    createdAt: { type: Date, default: new Date() },
    deletedAt: { type: Date, default: null }
},{collection: 'transaction'});

const transactionModel = mongoose.model('TransactionModel', transactionShema);

//export transaction model
module.exports = transactionModel;
