//Import Models
const Users = require('../models/UserModel');

//getUsers, updateUser, deleteUser, addUser

module.exports = {

    getUsers(req, res) {
        Users.find({},(error, users) => {
            if (error) {
                return res.status(500).send(error);
            }
            return res.json({ "data": users });
        });
    },


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

        Users.findOneAndUpdate({ _id: userId }, { $set: userInfos }, {new:true},(error, user) => {
            if (error) {
                return res.status(500).send(error);
            }
            return res.json({ "last_upated_user": user });
        });
    },

    

    deleteUser(req, res) {
        const userId = req.params.id
        const deletedDate = new Date();
        Users.findOneAndUpdate({ _id: userId }, { $set: { deletedAt: deletedDate } }, (error, user) => {
            if (error) {
                return res.status(500).send(error);
            }
            return res.json({ "last_deleted_user": user });
        });
    },

    addUser(req, res) {
        const newUser = new Users(req.body);

        newUser.save((error, user) => {
            if (error) {
                return res.status(500).send(error);
            }
            return res.json({ "last_inserted_user": user });
        });
    }
};
