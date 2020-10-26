//Import Transaction Model
const Transaction = require("../models/TransationModel");

module.exports = {
    // get all transactions
    getAllTransaction(req, res){
        Transaction.find({},(error, transactions)=>{
            if(error) return res.status(500).send(error);
            return res.json({"data": transactions});
        });
    },
};