const mongoose=require('mongoose');
const express = require("express");
const app=express();
app.use(express.json());

const db_link='mongodb+srv://username:GPieCQJadTvab603@cluster0.u8hoqny.mongodb.net/?retryWrites=true&w=majority';
mongoose.connect(db_link)
.then(function(db){
   console.log(' plan db coonect');
})
.catch(function(err){
    console.log(err);
});
 const planSchema=new mongoose.Schema({
    name:{
        type:String,
        require:true,
        unique:true,
        maxlenth:[20,"maxlength is exceed"]
    },
    duration:{
        type:Number,
        require:true,
    },
    price:{
        type:Number,
        require:true,
    },
    ratingsAverage:{
        type:Number
    },
    discount:{
        type:Number,
        validate:[function(){
            return this.discount<100;
        },"discount should not be greater than price"]
    }
 });

 const planModel=mongoose.model('planModel',planSchema);
 
   
 module.exports=planModel;
  