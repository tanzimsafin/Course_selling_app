const express=require('express');
const mongoose=require('mongoose');
const Schema=mongoose.Schema;
/**
 * Represents a special type of identifier used by MongoDB.
 * ObjectId is a class provided by Mongoose to handle MongoDB's unique identifier for documents.
 */
const ObjectId = mongoose.Types.ObjectId;

const UserSchema=new Schema({
    firstName:String,
    lastName:String,
    email:{type:String,unique:true},
    password:String
});

const adminSchema=new Schema({
    firstName:String,
    lastName:String,
    email:{type:String,unique:true},
    password:String
});

const courseSchema=new Schema({
    title:String,
    description:String,
    Price:Number,
    imgUrl:String,
    creatorId:ObjectId
});

const parchaseSchema=new Schema({
    userId:ObjectId,
    courseId:ObjectId
});

const userModel=mongoose.model('user',UserSchema);
const adminModel=mongoose.model('admin',adminSchema);
const courseModel=mongoose.model('course',courseSchema);
const parchaseModel=mongoose.model('parchase',parchaseSchema);

module.exports={
    userModel,
    adminModel,
    courseModel,
    parchaseModel
};