//get the path
const path = require('path');
const basePath = path.dirname(__dirname);


module.exports = {
    //home page
    goToHome(req,res){
        console.log(req.session.user);
        res.sendFile(path.join(basePath,"views/home.html"));
    },
    
    //login page
    gotToLogin(req, res){
        res.sendFile(path.join(basePath,"views/login.html"));
    },

    //register page
    gotToRegister(req, res){
        res.sendFile(path.join(basePath, "views/register.html"));
    },

    //go to gadgets page
    gotToGadget(req, res){
        res.sendFile(path.join(basePath, "views/gadgets.html"));
    },
    //go to groceries page
    gotToGroceries(req, res){
        res.sendFile(path.join(basePath, "views/groceries.html"));
    },
    //go to clothes page
    gotToClothes(req, res){
        res.sendFile(path.join(basePath, "views/clothes.html"));
    },
  
    //go to stocks
    gotToStocks(req, res){
        res.sendFile(path.join(basePath, "views/stocks.html"));
    },
    //go to add product
    goToAddNewProduct(req, res){
        res.sendFile(path.join(basePath,"views/add_product.html"));
    },

    // temporary route
    gotoUsers(req, res){
        res.sendFile(path.join(basePath,"views/users.html"));
    }

};