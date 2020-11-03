//Import Transaction Model
const Transaction = require("../models/TransactionModel");

//Import purchase Model (transaction is dependent on the model)
const Purchase = require("../models/PurchaseModel");

module.exports = {
    // get all transactions
    getAllTransactions(req, res) {
        Transaction.find({}, (error, transactions) => {
            if (error) return res.status(500).send(error);
            return res.json({ "data": transactions });
        });
    },
    //get all transaction and the populated value of purchases id
    getAllTransactionsAndPopulates(req, res){
        Transaction.find({}).populate('purchases')
            .exec((error, transactions)=>{
                if(error) return res.status(500).send(error);
                return res.json({"data": transactions});
            });
    },
    //getTransaction by id
    getTransactionById(req, res){
        const transacId = req.params.id;
        Transaction.findById(transacId, (error, transaction)=>{
            if(error) return res.status(500).send(error);
            return res.json({"data": transaction});
        });
    },
    //get transaction by id and the populated value of purchases id
    getTransactionsAndPopulatesById(req, res){
        const transacId = req.params.id;
        Transaction.findById(transacId).populate('purchases')
            .exec((error, transaction)=>{
                if(error) return res.status(500).send(error);
                return res.json({"data": transactions});
            });
    },
    // create transaction 
    addTransaction(req, res) {
        const newTransaction = new Transaction(req.body);
        newTransaction.save((error, transaction) => {
            if (error) return res.status(500).send(error);
            return res.json({ "last_inserted_transaction": transaction });
        });
    },

    //remove transaction
    deleteTransaction(req, res) {
        const transactionId = req.params.id;
        Transaction.findByOneAndUpdate({ _id: transactionId }, { $set: { deletedAt: new Date() } },
            (error, transaction) => {
                if (error) return res.status(500).send(error);
                return res.json(transaction);
            });
    },
};