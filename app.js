const express = require('express');
const app = express();
const {port} = require('./config');
const conn = require('./connection/connection');
const bodyParser = require('body-parser');




//Import Models
const Users = require('./models/UserModel');

//Verify mongodb connection
conn.mongoDBconnection()
    .then(res => {
        console.log(res.message);
        app.listen(port,()=> console.log(`Server is listening to port ${port}`));
    }).catch(err => {
        console.log(err.message);
    });


    app.get('/',(req, res)=>{
        res.send("test");
    });

    //test

    app.get('/users', (req,res)=>{
        Users.find({},(error, users)=>{
            if(error){
                return res.send(error);
            }
            return res.json({"data": users});
        });
    });

    
    app.post('/create_user',(req, res)=>{
        console.log(req.firstname);
        const newUser = new Users({
            firstname: req.firstname,
            lastname: req.lastname,
            middlename: req.middlename,
            age: req.age,
            roleId: req.roleId,
            email: req.email,
            roleId: req.roleId,
        });
        newUser.save((error, user)=> {
            if(error){
                return res.status(500).send(error);
            }
            return res.json({"last_inserted_user": user});
        });
    });




