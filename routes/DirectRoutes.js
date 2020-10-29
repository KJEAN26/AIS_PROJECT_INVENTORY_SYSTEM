const express = require('express');
const Router = express.Router();

//get the direct routes
const DirectRoute = require('../controllers/DirectController');

//Home route
Router.get('/home',DirectRoute.goToHome);

//get login page route
Router.get('/login', DirectRoute.gotToLogin);

//Register route
Router.get('/register', DirectRoute.gotToRegister);

//Gadget route
Router.get('/gadgets', DirectRoute.gotToGadget);

//grocery route
Router.get('/groceries', DirectRoute.gotToGroceries);
//clothes route
Router.get('/clothes', DirectRoute.gotToClothes);

//stocks route
Router.get('/stocks', DirectRoute.gotToStocks);




//export routes
module.exports = Router;