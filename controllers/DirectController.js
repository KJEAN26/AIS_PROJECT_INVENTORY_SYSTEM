//get the path
const path = require('path');
const basePath = path.dirname(__dirname);


module.exports = {
    //home page
    goToHome(req,res){
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
        res.sendFile(path.join(basePath, "views/products/gadgets.html"));
    },
    //go to groceries page
    gotToGroceries(req, res){
        res.sendFile(path.join(basePath, "views/products/groceries.html"));
    },
    //go to clothes page
    gotToClothes(req, res){
        res.sendFile(path.join(basePath, "views/products/clothes.html"));
    },
  
    //go to stocks
    gotToStocks(req, res){
        res.sendFile(path.join(basePath, "views/products/stocks.html"));
    },
    //go to add product
    goToAddNewProduct(req, res){
        res.sendFile(path.join(basePath,"views/products/add_product.html"));
    },

    //go to transactions
    gotoTransactions(req, res){
        res.sendFile(path.join(basePath, "views/products/transaction.html"));
    },

    // temporary routes
    gotoUsers(req, res){
        res.sendFile(path.join(basePath,"views/users.html"));
    },
    gotoEditUser(req, res){
        res.sendFile(path.join(basePath,"views/edit_user.html"));
    },
    changeProfile(req, res){
        res.sendFile(path.join(basePath,"views/profileEdit.html"));
    },

    //error routes
    unauthorized(req, res){
        res.sendFile(path.join(basePath,"views/forbbids/401.html"));
    }
};