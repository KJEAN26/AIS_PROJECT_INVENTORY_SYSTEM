const express = require('express');
const app = express();
const {port} = require('./config');
const conn = require('./connection/connection');
const bodyParser = require('body-parser');
var cors = require('cors');
const path = require('path');

//headers
app.use(cors());

//set static files
app.use('/static',express.static(path.join(__dirname,'Public')));

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

//test route
app.get('/register',(req, res)=>{
    res.sendFile(path.join(__dirname,"/views/register.html"));
});


//go to dashboards
app.get('/home',(req, res)=>{
    res.sendFile(path.join(__dirname,"/views/home.html"));
});

//use user routes
const userRoutes = require('./routes/UserRoutes');
app.use('/user',userRoutes);

//use product routes
const productRoutes = require('./routes/ProductRoutes');
app.use('/product',productRoutes);



