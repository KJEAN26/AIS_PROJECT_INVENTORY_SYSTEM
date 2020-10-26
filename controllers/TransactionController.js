//Import Transaction Model
const Transaction = require("../models/TransationModel");

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

    //get transaction by id
    getTransactionById(req, res) {
        const transactionId = req.params.id;
        Transaction.findById(transactionId, (error, transaction) => {
            if (error) return res.status(500).send(error);
            return res.json({ "transation": transaction });
        });
    }

};