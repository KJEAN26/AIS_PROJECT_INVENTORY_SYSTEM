const express = require("express");
const Router = express.Router();

//Import tranactio controller
const TransactionController = require("../controllers/TransactionController");

// get all transactions route
Router.get('/all', TransactionController.getAllTransactions);

//get transaction by id route
Router.get('/:id',TransactionController.getTransactionById);

//delete transation route
Router.delete('/delete/id', TransactionController.deleteTransaction);

// add new transaction route
Router.post('/add',TransactionController.addTransaction);

//export Route
module.exports = Router;