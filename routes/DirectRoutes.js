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

Router.get('/clothes', DirectRoute.gotToClothes);
//export routes
module.exports = Router;