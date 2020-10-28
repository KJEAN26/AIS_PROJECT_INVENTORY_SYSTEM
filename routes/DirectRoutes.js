const express = require('express');
const Router = express.Router();

//get the direct routes
const DirectRoute = require('../controllers/DirectController');

//page authorization
const PageAuth = require('../middleware/DataAuthorization');

//Home route
Router.get('/home', PageAuth.authorizedForpage, DirectRoute.goToHome);

//get login page route
Router.get('/login', DirectRoute.gotToLogin);

// user logout
Router.get('/logout', PageAuth.deleteCookie, DirectRoute.gotToLogin)

//Register route
Router.get('/register', PageAuth.deleteCookie, DirectRoute.gotToRegister);

//Gadget route
Router.get('/gadgets', PageAuth.deleteCookie, DirectRoute.gotToGadget);

//grocery route
Router.get('/groceries', PageAuth.deleteCookie, DirectRoute.gotToGroceries);

Router.get('/clothes', PageAuth.deleteCookie, DirectRoute.gotToClothes

);
//export routes
module.exports = Router;