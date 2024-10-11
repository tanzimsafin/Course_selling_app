const express=require('express');
const jwt=require('jsonwebtoken');
const {JWT_SECRET_User}=require('../config');
function userMiddleware(req,res,next){
    const token=req.headers.token;
    const decoded=jwt.verify(token,process.env.JWT_SECRET_User);
    if (decoded){
        req.userId=decoded.id;//Error detected don't use const here
        next();
    }
    else{
        res.status(403).json({
           message:"You are not Sign in"
        });
        
    }
}
module.exports={
   userMiddleware:userMiddleware //error detected please check the name
}