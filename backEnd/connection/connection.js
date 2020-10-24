const mongoose = require('mongoose');
const { dbUrl } = require('../config');

const mongoDBconnection = () => {
    mongoose.connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true });
    const db = mongoose.connection;
    return new Promise((resolve, reject) => {
        db.once('open', () => {
            resolve({ message: "Success", error: false });
        });
        db.on('error', (err) => {
            reject({ message: `ERROR: ${err}`, error: true });
        });
    })
};

module.exports = { mongoDBconnection };