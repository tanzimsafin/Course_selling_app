//admin
const express = require('express');
const Router = express.Router;
const adminRouter = Router();

//signup
adminRouter.post('/signup',function(req,res){
    res.json({
       message:"admin is signed Up!"
    });
});

//signin
adminRouter.post('/signin',function(req,res){
    res.json({
       message:"User is signed In!"
    });
});

//create_course
adminRouter.post('/create_course',function(req,res){
    res.json({
       message:"Admin create a course!"
    });
});

//delete_course
adminRouter.delete('/delete_course',function(req,res){
    res.json({
       message:"Admin create a course!"
    });
});

//add_course_content
adminRouter.post('/add_course_content',function(req,res){
    res.json({
       message:"Admin add content to this course!"
    });
});

//update_course
adminRouter.put('/Update_course',function(req,res){
    res.json({
       message:"Admin Update  a course!"
    });
});

module.exports={
    adminRouter:adminRouter
};