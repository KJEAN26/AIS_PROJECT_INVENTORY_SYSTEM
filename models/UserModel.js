const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    firstname: {type: String, required: true},
    lastname: {type: String, required: true},
    middlename: {type: String},
    email: {type: String, required: true, unique: true},
    age: {type: Number, required: true},
    roleId: {type: Number, reequired: true},
    createdAt: {type: Date, default: new Date()},
    deletedAt:{type: Date},
});

const UserModel = mongoose.model('UserModel', userSchema);

module.exports = UserModel;