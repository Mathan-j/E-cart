const passport = require("passport");
const jwt  = require('jsonwebtoken');
const userModel = require('../modals/userModel');
const JWT_SECRET = process.env.JWT_SECRET;

const generateAuthTokens = (req,res)=>{
    const user = req.user;
    const token = jwt.sign({ _id:user._id,role:user.userRole }, JWT_SECRET ,{
        expiresIn: '5h',
      });
      res.status(200).json({message:"Authenticated Successfully", token})
}

const isAuthenticated =(req,res,next)=>{
    if(req.isAuthenticated()){
        return next();
    }
    res.status(401).json({message:"Unauthorized"})
}

const verifyToken = passport.authenticate("jwt",{session:false});

const verifyRole =(roles)=>{
    return (req,res,next)=>{
        if( req.user && roles.includes(req.user.userRole)){
            return next();
        }
        res.status(403).json({message:"Unauthorized Access"})
    }
}

module.exports = {
    generateAuthTokens,
    isAuthenticated,
    verifyToken,
    verifyRole,  // Custom middleware for role verification
 };

