//get the path
const path = require('path');
const basePath = path.dirname(__dirname);

module.exports = {
    //home routes
    goToHome(req,res){
        res.sendFile(path.join(basePath,"views/home.html"));
    },
    gotToLogin(req, res){
        res.sendFile(path.join(basePath,"views/login.html"));
    },
    gotToRegister(req, res){
        res.sendFile(path.join(basePath, "views/register.html"));
    },
};