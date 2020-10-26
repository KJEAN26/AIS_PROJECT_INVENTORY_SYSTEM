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

//export routes
module.exports = Router;