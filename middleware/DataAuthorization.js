const jwt = require('jsonwebtoken');
const accessTokenSecret = "thisisasecret!";
const path = require('path');
const basePath = path.dirname(__dirname);

// //Get the users model
// const User = require('../models/UserModel');

//exports the authentication
module.exports = {
    //authorized

    //only for data 
    authorized(req, res, next) {
        const authHeader = req.headers.authorization;

        if (authHeader) {
            const token = authHeader.split(' ')[1];

            jwt.verify(token, accessTokenSecret, (err, user) => {
                if (err) {
                    return res.sendStatus(403);
                }
                req.session.user = user;
                next();
            });
        } else {
            res.sendStatus(401);
        }
    },

    //only for html pages
    authorizedForpage(req, res, next){
        if (req.cookies.access_token) {
            const token = req.cookies.access_token;

            jwt.verify(token, accessTokenSecret, (err) => {
                if (err) {
                    return res.sendStatus(403);
                }
                next();
            });
        } else {
            res.redirect('login');
        }
    },

    //only for logout
    deleteCookie(req, res, next){
        if(req.cookies.access_token) res.clearCookie("access_token");
        return res.redirect('login');
    },

    //temporary
    adminOnly(req, res, next){
        // console.log("This is user 1",req.session.user1);
        let role;
        if(req.session.user1){
            role = req.session.user1.role;
        }else{
            role= req.session.user.user.role;
        }
        if(role == "employee") return res.redirect("unauthorized");
        next(); 
    },
    //all ready login
    //avoids going to log in again
    // for login route only
    avoidLogin(req, res, next){
        if(req.cookies.access_token) {
            return res.redirect('home')
        }else {
            return next();
        }
    }
};

