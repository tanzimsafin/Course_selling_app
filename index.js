require('dotenv').config();
const express=require("express");
const mongoose = require("mongoose");
const app=express();
app.use(express.json());

console.log(process.env.MONGO_URL);

const {userRouter}=require('./router/user');
const {adminRouter}=require('./router/admin');
const {courseRouter}=require('./router/course');

app.use('/app/v1/user',userRouter);
app.use('/app/v1/admin',adminRouter);
app.use('/app/v1/course',courseRouter);

async function main(){
    await mongoose.connect(process.env.MONGO_URL);
    console.log(`DB connected!`);
    app.listen(3000);
    console.log("listening on port 3000")
}
main();
