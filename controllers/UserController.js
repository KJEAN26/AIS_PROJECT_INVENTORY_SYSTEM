//Import Models
const Users = require('../models/UserModel');

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
            roleId: req.body.roleId,
            email: req.body.email,
        };

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
        const newUser = new Users(req.body);

        newUser.save((error, user) => {
            if (error) return res.status(500).send(error);
            return res.json({ "last_inserted_user": user });
        });
    },

    //login controller
    login(req, res) {
        Users.findOne({ email: req.body.email, password: req.body.password },
            (error, user) => {
                if (error) return res.status(500).send(error);
                //check if there is a user found
                if (user == null) return res.status(500).json({ error: true, message: "Email and password doesn't match" });

                //generate token
                const accessToken = jwtwebtoken.sign({ user }, accessTokenSecret, { expiresIn: "12h" });

                res.cookie("access_token", accessToken, { maxAge: 60000 * 60 * 12, httpOnly: true });
                
                return res.json({ "user_data": user, "access_token": accessToken });
            });
    },
};
