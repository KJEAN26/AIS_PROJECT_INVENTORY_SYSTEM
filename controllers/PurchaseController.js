//import purchase model 
const Purchase = require("../models/PurchaseModel");

// //import transaction 
// const Transaction = require("../models/TransactionModel");

//Import product model
const Product = require('../models/ProductModel');

//exports all controllers
module.exports = {
    // get all pruchases documents
    getAllPurchases(req, res) {
        Purchase.find({}, (error, purchases) => {
            if (error) return res.status(500).send(error);
            return res.json({ "data": purchases });
        });
    },
    // create new purchases
    addPurchases(req, res) {
        const newPurchase = new Purchase(req.body);

        newPurchase.save((error, purchase) => {
            if (error) return res.status(500).send(error);
            return res.json({ "last_Inserted_purchase": purchase });
        });
    },
    //get the sales
    getTotalSales(req, res) {
        let sales = 0;
        Purchase.find({}, (error, purchases) => {
            if (error) return res.status(500).send(error);
            purchases.forEach(ele => {
                ele.purchase.forEach(async prod => {
                   await Product.findOne({ _id: prod.product }, (error, product) => {
                        if (error) return res.status(500).send(error);
                        sales += product.productPrice;
                    });
                    return res.json({ "sales": sales });
                });
            });
        })
    },
    //delete purchase by id
    deletePurchase(req, res) {
        const purchaseId = req.params.id;
        Purchase.findByIdAndUpdate(purchaseId, { $set: { deletedAt: new Date() } },
            (error, purchase) => {
                if (error) return res.status(500).send(error);
                return res.json({ "last_deleted_purchase": purchase });
            });
    }
};