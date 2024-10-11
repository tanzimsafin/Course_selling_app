const express=require('express');
const Router=express.Router;
const courseRouter=Router();

//see all courses
courseRouter.get('/app/v1/user/all_courses',function(req,res){
    res.json({
       message:"Here is all!"
    });
});

module.exports={
    courseRouter:courseRouter
};