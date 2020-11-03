const express = require("express");
const Router = express.Router();

// Import purchase controller
const PurchaseController = require('../controllers/PurchaseController');

//get all purchases route
Router.get('/all',PurchaseController.getAllPurchases);

//get all purchases with populated value route
Router.get('/populate/all',PurchaseController.getAllPurchasesWithPopulate);

//delete by id route
Router.delete('/delete/:id',PurchaseController.deletePurchase);

//add new purchase route
Router.post('/add', PurchaseController.addPurchases);


//exports the Router
module.exports = Router;