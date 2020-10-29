const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    firstname: {type: String, required: true},
    lastname: {type: String, required: true},
    middlename: {type: String},
    gender:{type: String, enum:["male","female","other"], required: true},
    profilepic:{type: String, default: "avatar.png"},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    age: {type: Number, required: true},
    role: {type: String, enum:['admin','employee'],required: true},
    createdAt: {type: Date, default: new Date()},
    deletedAt:{type: Date, default: null},
},{collection: 'users'});

const UserModel = mongoose.model('UserModel', userSchema);

module.exports = UserModel;
