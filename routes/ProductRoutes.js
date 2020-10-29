const express = require('express');
const UserController = require('../controllers/UserController');
const Router = express.Router();
// const multer = require('multer');

// const upload = multer({dest: "Public/image/"});

//Import Product controller 
const ProductController = require('../controllers/ProductController');

//get all product route
Router.get('/all', ProductController.getProducts);

//get products by category
Router.get('/limited/:category', ProductController.getProductsByCategory)

//update product route
Router.put('/update/:id', ProductController.updateProduct);

//delete product route
Router.delete('/delete/:id', ProductController.deleteProduct);

//add product route
Router.post('/add', ProductController.addProduct);

//test temporary rout for uploading image
Router.post('/upload', ProductController.uploadProductImage);

module.exports = Router;