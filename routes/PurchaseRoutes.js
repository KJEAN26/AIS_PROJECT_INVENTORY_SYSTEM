const express = require("express");
const Router = express.Router();

// Import purchase controller
const PurchaseController = require('../controllers/PurchaseController');

//get all purchases route
Router.get('/all',PurchaseController.getAllPurchases);

//delete by id route
Router.delete('/delete/:id',PurchaseController.deletePurchase);

//add new purchase route
Router.post('/add', PurchaseController.addPurchases);

//get sales
Router.get('/sales', PurchaseController.getTotalSales);

//exports the Router
module.exports = Router;