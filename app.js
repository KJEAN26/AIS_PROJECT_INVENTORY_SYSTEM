const express = require('express');
const app = express();
const {port} = require('./config');
const conn = require('./connection/connection');
const bodyParser = require('body-parser');
var cors = require('cors');
const path = require('path');
const cookieParser = require('cookie-parser');
const session =  require('express-session');

//use session
app.use(session({secret: "Thisisascret"}));

//Allow headers
app.use(cors());

//use cookie parser
app.use(cookieParser());

//set static files
app.use('/static',express.static(path.join(__dirname,'Public')));

//authorization
const AUTH = require('./middleware/DataAuthorization');

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

//use direct routes
const directRoutes = require('./routes/DirectRoutes');
app.use(directRoutes);

//use user routes
const userRoutes = require('./routes/UserRoutes');
app.use('/user',AUTH.authorized,userRoutes);

//use product routes
const productRoutes = require('./routes/ProductRoutes');
app.use('/product',AUTH.authorized,productRoutes);

//use purchase routes
const purchaseRoutes = require("./routes/PurchaseRoutes");
app.use('/purchase',AUTH.authorized,purchaseRoutes);

//use transaction routes
const transactionRoutes = require('./routes/TransactionRoutes');
app.use('/transaction',AUTH.authorized,transactionRoutes);


