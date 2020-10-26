const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const transactionShema = new Schema({
    productId: { type: Schema.Types.ObjectId, ref: 'products', required: true },
    userId: { type: Schema.Types.ObjectId, ref: 'users', required: true },
    createdAt: {type: Date, default: new Date()},
    deletedAt: {type: Date, default: null}
});

const transactionModel = mongoose.model('TransactionModel',transactionShema);

module.exports = transactionModel;
