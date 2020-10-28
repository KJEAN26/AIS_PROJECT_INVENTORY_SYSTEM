const express = require('express');
const UserController = require('../controllers/UserController');
const Router = express.Router();
//user routes here
const userController = require('../controllers/UserController');

//authorization
const AUTH = require('../middleware/DataAuthorization');

//get all users
Router.get("/all",AUTH.authorized,userController.getUsers);

//update user
Router.put("/update_user/:id",userController.updateUser);

//delete user
Router.delete("/delete/:id",UserController.deleteUser);

//add user
Router.post("/add",userController.addUser);

//recieve user login credentials
Router.post('/login',userController.login);

module.exports = Router;