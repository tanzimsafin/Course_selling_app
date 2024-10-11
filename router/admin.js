//admin
const express = require('express');
const jwt=require('jsonwebtoken');
const Router = express.Router;
const adminRouter = Router();
const {JWT_SECRET_Admin}=require('../config');

//bcrypt for hashing password
const bcrypt=require('bcrypt');

//use for input validation
const {z}=require('zod');
const {adminModel}=require('../db');


//signup
adminRouter.post('/signup',async function(req,res){
    const firstName=req.body.firstName;
    const lastName=req.body.lastName;
    const email=req.body.email;
    const password=req.body.password;
    const mySchema = z.object({
        firstName: z.string().min(3).max(20),
        lastName: z.string().min(3).max(20),
        email: z.string().max(100).email(),
        password: z.string().min(5).max(20).regex(/^(?=.*[A-Z])(?=.*[!@#$%^&*])/)
    });
    const validateInput=mySchema.safeParse(req.body);
    if(!validateInput){
        res.json("Sorry Incorrect Format",validateInput.error);
        return
    }
    try{
      const saltRounds = parseInt(process.env.SALT_ROUNDS, 10);
      const hashedpassword = await bcrypt.hash(password, saltRounds); //make it primisified
      console.log(hashedpassword);
      await adminModel.create({
         firstName,
         lastName,
         email,
         password:hashedpassword,//error detected if not both key value same write full one
       });
      res.json({
        message:"admin is signed Up!",
      });
    } catch(err){
        console.log('Duplicate User')
    }
   
});

//signin
adminRouter.post('/signin',async function(req,res){
    const email=req.body.email;
    const password=req.body.password;
    const UserExist=await adminModel.findOne({
        email:email
    });
    if (UserExist){
        const UserId=UserExist._id;
        
        const Hashedpassword=UserExist.password;
        const match = await bcrypt.compare(password,Hashedpassword);
        if(match){
            const token=jwt.sign({ id: UserId }, process.env.JWT_SECRET_Admin);
            //error detected as user id is An object parameter
            res.json({
                message:"User is signed In!",
                token:token
             });
        }
    }else{
        res.json({
            message:"Invalid Credential"
        });
    }
    
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