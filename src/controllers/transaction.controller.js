const transactionModel = require("../models/transaction.model.js");
const ledgerModel = require('../models/ledger.model.js')
const asyncHandler = require('../utils/asyncHandler.js');
const accountModel = require("../models/account.model.js");


const initialTransaction = asyncHandler(async (req , res) => {

    // VALIDATE REQUESTS OR ACCOUNTS
    const {fromAccount , toAccount , amount , idempotencyKey} = req.body ;

    if(!toAccount || !amount || !idempotencyKey , !fromAccount) {
        return res.status(400).json({
            status : 400 ,
            message : "All fields are required !"
        })
    };

    const fromUserAccount = await accountModel.findOne({
        _id : fromAccount
    });

    const toUserAccount = await accountModel.findOne({
        _id : toAccount
    });

    if(!fromUserAccount || !toUserAccount) {
        return res.status(400).json({
            status : 400 ,
            message : "Transaction failed ! Maybe account no is invalid !"
        })
    }

    //VALIDATE IDEMPOTENCY KEY
    const isTransactionAlreadyExist = await transactionModel.findOne({
        idempotencyKey : idempotencyKey
    });

    if(isTransactionAlreadyExist) {
        if(isTransactionAlreadyExist.status === "COMPLETED") {
            return res.status(200).json({
                status : 200 ,
                message : "You transaction processed successfully !"
            })
        }
        if(isTransactionAlreadyExist.status === "PENDING") {
            return res.status(200).json({
                status : 200 ,
                message : "your transaction is in pending !"
            })
        }
        if(isTransactionAlreadyExist.status === "FAILED") {
            return res.status(400).json({
                status :  400 ,
                message : 'Your Transaction failed  !'
            })
        }
        if(isTransactionAlreadyExist.status === "REVERSED") {
            return res.status(500).json({
                status : 500 ,
                message : "your transaction reversed due to some server error"
            })
        }
    };

    //ACCOUNT STATUS CHECKING
    if(fromAccount.status !== "ACTIVE" || toAccount.status !== "ACTIVE") {
        return res.status(500).json({
            status : 500 ,
            message : "Account disactive or closed between one or both !"
        })
    }
    
});

module.exports = {initialTransaction};