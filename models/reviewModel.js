const mongoose=require('mongoose');
const express = require("express");
const app=express();
app.use(express.json());

const db_link='mongodb+srv://username:GPieCQJadTvab603@cluster0.u8hoqny.mongodb.net/?retryWrites=true&w=majority';
mongoose.connect(db_link)
.then(function(db){
   console.log(' review db coonect');
})
.catch(function(err){
    console.log(err);
});
const reviewSchema= new mongoose.Schema({
     review :{
        type:String,
        require:[true,"review is required"]

     },
     rating:{
        type:Number,
        min:1,
        max:10,
        require:[true,"rating is reqired"]

     },
     createdAt:{
        type:Date,
        default:Date.now()
     },
     user:{
        type:mongoose.Schema.ObjectId,
        ref:'userModel',
        required:[true,'review must belong to user']
     },
     plan:{
        type:mongoose.Schema.ObjectId,
        ref:'planModel',
        required:[true,'review must belong to a plan']
     },
});
// before find ke function 
reviewSchema.pre(/^find/,function(next){
    //bring information of user name and profileimage 
    this.populate({
        path:"user",
        select:"name profileImage"
    })//bring full information of plan
    .populate("plan");
    next();
})
const reviewModel=mongoose.model('reviewModel',reviewSchema);
module.exports=reviewModel;