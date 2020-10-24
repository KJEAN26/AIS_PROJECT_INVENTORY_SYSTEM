const express = require('express');
const app = express();
const {port} = require('./config');
const conn = require('./connection/connection');

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

    app.get('/retrieve_users', (req,res)=>{
        Users.find({},(error, users)=>{
            if(error){
                return res.send(error);
            }
            return res.json({"data": users});
        });
    });

    
    app.post('/create_user',);




