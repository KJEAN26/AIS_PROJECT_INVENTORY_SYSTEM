const express = require('express');
const app = express();
const {port} = require('./config');
const conn = require('./connection/connection');
const bodyParser = require('body-parser');
const cors = require('cors');

//headers
app.use(cors());

//Parse the body
app.use(bodyParser.urlencoded({extended: false }));
app.use(bodyParser.json());


//Verify mongodb connection
conn.mongoDBconnection()
    .then(res => {
        console.log(res.message);
        app.listen(port,()=> console.log(`Server is listening to port ${port}`));
    }).catch(err => {
        console.log(err.message);
    });

//use user routes
const userRoutes = require('./routes/UserRoutes');
app.use('/user/',userRoutes);



