//Import product Model
const Product = require("../models/ProductModel");

module.exports = {

    getProducts(req,res){
        Product.find({},(error, products)=>{
            if(error){
                return res.status(500).send(error);
            }
            return res.json({"data":products});
        });
    },

    updateProduct(res,req){
        const editedProduct = {
            product_name: req.body.product_name,
        }
        Product.findByIdAndUpdate()
    },
};