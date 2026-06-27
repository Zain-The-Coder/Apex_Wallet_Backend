const accountModel = require('../models/account.model.js');
const asyncHandler = require('../utils/asyncHandler.js')

const createAccount = asyncHandler(async (req , res) => {
    const user = req.user ;

    const account = await accountModel.create({
        user : user._id
    });

    
    res.status(201).json({
        status : 201 , 
        message : "Account Created Successfully !" ,
        account
    });
})

module.exports = {createAccount};