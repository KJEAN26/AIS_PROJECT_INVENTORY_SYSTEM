//Import Models
const Users = require('../models/UserModel');

//import bycrypt
const bycrypt = require('bcrypt');
const salt = 10;

//get jwt
const jwtwebtoken = require('jsonwebtoken');
const accessTokenSecret = "thisisasecret!";

//getUsers, updateUser, deleteUser, addUser, login

module.exports = {

    getUsers(req, res) {
        console.log("This is from get all user:",req.session.user);
        Users.find({}, (error, users) => {
            if (error) return res.status(500).send(error);
            return res.json({ "data": users });
        });
    },

    //
    updateUser(req, res) {
        const userId = req.params.id
        const userInfos = {
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            middlename: req.body.middlename,
            password: req.body.password,
            age: req.body.age,
            role: req.body.role,
            email: req.body.email,
            gender: req.body.gender
        };
        if(req.body.password){
            userInfos["password"] = bycrypt.hashSync(req.body.password, salt);
        }

        Users.findOneAndUpdate({ _id: userId }, { $set: userInfos }, { new: true }, (error, user) => {
            if (error) return res.status(500).send(error);
            return res.json({ "last_upated_user": user });
        });
    },


    // delete user by id
    deleteUser(req, res) {
        const userId = req.params.id
        const deletedDate = new Date();
        Users.findOneAndUpdate({ _id: userId }, { $set: { deletedAt: deletedDate } }, (error, user) => {
            if (error) return res.status(500).send(error);
            return res.json({ "last_deleted_user": user });
        });
    },

    //add new user
    addUser(req, res) {
        const userInfos = {
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            middlename: req.body.middlename,
            age: req.body.age,
            role: req.body.role,
            email: req.body.email,
            gender: req.body.gender
        };
        userInfos["password"] = bycrypt.hashSync(req.body.password, salt);

        const newUser = new Users(userInfos);

        newUser.save((error, user) => {
            if (error) return res.status(500).send(error);
            return res.json({ "last_inserted_user": user });
        });
    },

    //login controller
    login(req, res) {
        Users.findOne({ email: req.body.email},
            (error, user) => {
                if (error) return res.status(500).send(error);
                //check if the email match
                if (user == null) return res.status(500).json({ error: true, 
                    fieldname:"email",message: "Email doesn't match" });
                //check if the password match
                if(!bycrypt.compareSync(req.body.password, user.password)) return res.status(500).json({ error: true, 
                    fieldname: "password",message: "Password doesn't match" });

                //generate token
                const accessToken = jwtwebtoken.sign({ user }, accessTokenSecret, { expiresIn: "12h" });

                res.cookie("access_token", accessToken, { maxAge: 60000 * 60 * 12, httpOnly: true });
                
                return res.json({ "user_data": user, "access_token": accessToken });
            });
    },
};
