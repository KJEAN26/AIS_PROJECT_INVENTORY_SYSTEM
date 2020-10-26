//get the path
const path = require('path');
const basePath = path.dirname(__dirname);


module.exports = {
    //home controller
    goToHome(req,res){
        res.sendFile(path.join(basePath,"views/home.html"));
    },
    
    //login page
    gotToLogin(req, res){
        res.sendFile(path.join(basePath,"views/login.html"));
    },

    //register controller
    gotToRegister(req, res){
        res.sendFile(path.join(basePath, "views/register.html"));
    },
};