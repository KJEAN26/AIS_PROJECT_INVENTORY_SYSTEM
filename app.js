const express = require('express');
const app = express();
const {port} = require('./config');
const conn = require('./connection/connection');

conn.mongoDBconnection()
    .then(res => {
        console.log(res.message);
        app.listen(port,()=> console.log(`Server is listening to port ${port}`));
    }).catch(err => {
        console.log(err.message);
    });

    





