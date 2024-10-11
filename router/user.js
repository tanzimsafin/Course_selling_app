const express=require('express');
const Router=express.Router;
const userRouter=Router();
const {JWT_SECRET_User}=require('../config');
const {userMiddleware}=require('../Middleware/user');
const jwt=require('jsonwebtoken');

const {parchaseModel, courseModel}=require('../db');
const {userModel}=require('../db');
//bcrypt for hashing password
const bcrypt=require('bcrypt');

//use for input validation
const {z}=require('zod');
const {adminModel}=require('../db');
//signUp
userRouter.post('/signup',async function(req,res){
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
      await userModel.create({
         firstName,
         lastName,
         email,
         password:hashedpassword,//error detected if not both key value same write full one
       });
       res.json({
         message:"User is signed Up!"
      });
    } catch(err){
        console.log('Duplicate User')
    }
    
});
//signIn
userRouter.post('/signin',async function(req,res){
    const email=req.body.email;
    const password=req.body.password;
    const UserExist=await userModel.findOne({
        email:email
    });
    if (UserExist){
        const UserId=UserExist._id;
        const Hashedpassword=UserExist.password;
        const match = await bcrypt.compare(password,Hashedpassword);
        if(match){
            const token=jwt.sign({ id: UserId },JWT_SECRET_User);
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
//parchase course
userRouter.post('/purchase',userMiddleware,async function(req,res){
   const userId=req.userId;
   const courseId=req.body.courseId;
   await parchaseModel.create({
     userId:userId,
     courseId:courseId
   });
   res.json({
      message:"User parchse this course!",
      courseId:courseId,
      userId:userId
   });
});
//see_parchase
userRouter.get('/see_purchases', userMiddleware, async function(req, res) {
    const userId = req.userId;
    try {
        const purchases = await parchaseModel.find({ userId: userId });
        const courseIds = purchases.map(purchase => purchase.courseId);
        const courses = await courseModel.find({ _id: { $in: courseIds } });
        res.json({
            message: "User purchased these courses!",
            courses: courses
        });
    } catch (error) {
        res.status(500).json({
            message: "An error occurred while fetching purchases.",
            error: error.message
        });
    }
});

module.exports={
   userRouter:userRouter
};
