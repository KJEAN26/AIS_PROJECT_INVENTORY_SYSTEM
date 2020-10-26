const express = require('express');
const UserController = require('../controllers/UserController');
const Router = express.Router();

//Import Product controller 
const ProductController = require('../controllers/ProductController');

//get all product route
Router.get('/all', ProductController.getProducts);

//update product route
Router.put('/update/:id',ProductController.updateProduct);

//delete product route
Router.delete('/delete/:id',ProductController.deleteProduct);

//add product route
Router.post('/add',ProductController.addProduct);

module.exports = Router;