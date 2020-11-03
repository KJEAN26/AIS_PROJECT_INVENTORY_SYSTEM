//import purchase model 
const Purchase = require("../models/PurchaseModel");

// //import transaction 
// const Transaction = require("../models/TransactionModel");

//exports all controllers
module.exports = {
    // get all pruchases documents
    getAllPurchases(req, res){
        Purchase.find({},(error, purchases)=>{
            if(error) return res.status(500).send(error);
            return res.json({"data": purchases});
        });
    },
    //get all purchases with populated documents
    getAllPurchasesWithPopulate(req, res){
        Purchase.find({})
            .populate('products')
            .exec((error, purchases)=>{
                if (error) return res.status(500).send(error);
                return res.json(purchases);
            });
    },
    // create new purchases
    addPurchases(req, res){
        const newPurchase = new Purchase(req.body);

        newPurchase.save((error, purchase)=>{
            if(error) return res.status(500).send(error);
            return res.json({"last_Inserted_purchase": purchase});
        });
    },

    //delete purchase by id
    deletePurchase(req ,res){
        const purchaseId = req.params.id;
        Purchase.findByIdAndUpdate(purchaseId,{$set:{deletedAt: new Date()}},
        (error, purchase)=>{
            if(error) return res.status(500).send(error);
            return res.json({"last_deleted_purchase": purchase});
        });
    }
};