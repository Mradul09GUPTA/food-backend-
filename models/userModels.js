const mongoose=require('mongoose');
const express = require("express");
const app=express();
app.use(express.json());
const emailValidator=require('email-validator');
const bcrypt= require('bcrypt');
const crypto=require('crypto');
const db_link='mongodb+srv://username:GPieCQJadTvab603@cluster0.u8hoqny.mongodb.net/?retryWrites=true&w=majority';
mongoose.connect(db_link)
.then(function(db){
   console.log(' user db coonect');
})
.catch(function(err){
    console.log(err);
});
const userSchema=mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email: {
        type:String,
        required:true,
        unique:true,
        validate: function(){
            return emailValidator.validate(this.email);
        }
    },
    password:{
        type:String,
        required:true,
        minLength:8
    },
    confirmPassword:{
       type:String,
       required :true,
       miniLength:8,
       validate:function(){
        return this.confirmPassword==this.password
       }
    },
    role:{
       type:String,
       enum:['admin','user','restaurantowner','deiveryboy'],
       default:'user'
    },
    profileImage:{
        type:String,
        default:'image.jpg'
    },
    resetToken:String

});

//create neww token 
userSchema.methods.createResetToken=function(){
    //crypto
    //creating unique token using npm i crypto
    const resetToken=crypto.randomBytes(32).toString("hex");
    this.resetToken = resetToken;
    return resetToken;
}

userSchema.methods.resetPasswordHandler=function(password,confirmPassword){ 
   this.password=password;
   this.confirmPassword=confirmPassword;
   this.resetToken=undefined;
}
userSchema.pre('save',function(){
    this.confirm_password=undefined;
});

const userModel=mongoose.model('userModel',userSchema);
module.exports=userModel;
