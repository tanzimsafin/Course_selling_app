const express=require('express');
const Router=express.Router;
const userRouter=Router();
//signUp
userRouter.post('/signup',function(req,res){
    res.json({
       message:"User is signed Up!"
    });
});
//signIn
userRouter.post('/signin',function(req,res){
   res.json({
      message:"User is signed In!"
   });
});
//parchase course
userRouter.post('/parchase',function(req,res){
   res.json({
      message:"User parchse this course!"
   });
});
//see_parchase
userRouter.get('/see_parchase',function(req,res){
   res.json({
      message:"User parchse this course!"
   });
});

module.exports={
   userRouter:userRouter
};
