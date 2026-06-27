const transactionModel = require("../models/transaction.model.js");
const ledgerModel = require('../models/ledger.model.js')
const asyncHandler = require('../utils/asyncHandler.js');
const accountModel = require("../models/account.model.js");


const initialTransaction = asyncHandler(async (req , res) => {
    const {toAccount , amount , idempotencyKey} = req.body ;

    if(!toAccount || !amount || !idempotencyKey) {
        return res.status(400).json({
            status : 400 ,
            message : "All fields are required !"
        })
    };

    const toUserAccount = await accountModel.findOne({
        _id : toAccount
    });

    if(!toUserAccount) {
        res.status(400).json({
            status : 400 ,
            message : "account doesn't exist !"
        })
    };

    const fromUserAccount = await accountModel.findOne({
        systemUser : true ,
        _id : req.user._id
    });

    if(!fromUserAccount) {
        return res.status(404).json({
            status : 404 ,
            message : "System account not found !"
        })
    }

})
