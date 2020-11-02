const express = require('express');
const UserController = require('../controllers/UserController');
const Router = express.Router();
//user routes here
const userController = require('../controllers/UserController');

//authorization
const AUTH = require('../middleware/DataAuthorization');

//get all users
Router.get("/all", AUTH.authorized, userController.getUsers);

//get user by id
Router.get("/:id", AUTH.authorized, userController.getUserById);

//change profile
Router.post("/profile/:id", AUTH.authorized, userController.uploadUseProfile);

//update user
Router.put("/update_user/:id", AUTH.authorized, userController.updateUser);

//delete user
Router.delete("/delete/:id", AUTH.authorized, UserController.deleteUser);

//add user
Router.post("/add",AUTH.authorized, userController.addUser);

//recieve user login credentials
Router.post('/login', userController.login);


module.exports = Router;