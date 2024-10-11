const express=require('express');
const Router=express.Router;
const courseRouter=Router();
const {courseModel}=require('../db');
//see all courses
courseRouter.get('/all_courses',async function(req,res){
    const all_courses=await courseModel.find({});
    res.json({
       message:"Here is all courses!",
       all_courses:all_courses
    });
});
module.exports={
    courseRouter:courseRouter
};