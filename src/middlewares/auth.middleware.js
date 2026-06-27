const userModel = require('../models/account.model.js');
const jwt =  require('jsonwebtoken');

async function authMiddleware (req , res , res) {
    try {
        const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
        
        if(!token) {
            return res.status(401).json({
                status : 401 , 
                message : "User not found "
            })
        };

        try {
            const decoded = jwt.verify(token , process.env.JWT_SECRET);
            
        } catch (e) {
            return res.status(401).json({
                status : 401 ,
                message : "Unauthorized Access , Token Is Invalid !"
            })
        }

    } catch (e) {

    }
}