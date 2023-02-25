const userModel=require('../models/userModels');
//const userModel=mongoose.model('userModel',userSchema);

const express = require("express");
const app=express();
app.use(express.json());

//getUser
module.exports.getUser=async function getUser(req,res)
{
    let id=req.id;
    console.log(id);
    let user=await userModel.findById(id);
    if(user){
        return res.json(user);
    }
    else {
        return res.json({
            message:'user not found please login again'
        });
    }
}

//update
module.exports.updateUser =async function updateUser(req,res){
    console.log("req.body->",req.body);
    let id=req.params.id;
    console.log(id);
    let user= await userModel.findById(id);
    console.log(user);
    let dataToBeUpdate = req.body;
    try{
        console.log("try");
    if(user)
    {
        const keys=[];
        for(key in dataToBeUpdate){
        keys.push(key);
          console.log(key);}
        for(let i=0;i<keys.length;i++){
           user[keys[i]]=dataToBeUpdate[keys[i]]; 
           console.log(user[keys[i]]);
        }
        console.log(user);
         await user.save();
        
        return res.json({
            message:"data has updated",
            data:user
        })
    }
    else{
        return res.json({
            message:"user not found"
            //data:user
        })
    }}
    catch(err){
        return res.json({
            message:err.message
        })
    }
   
  
}

//delete
module.exports.deleteUser =async function deleteUser(req,res){
    try{
    let id = req.params.id;
    //let dataToBeDeleted =req.body;
    let user =await userModel.findByIdAndDelete(id);
    if(!user){
        res.json({
            message:"user is not found",
            //data: user
        });
    }
    res.json({
        message:"data has been deleted",
        data: user
    }); }
    catch(err){
        res.json({
            message:err.message,
            //data: user
        });
    }

}

//getalluser
module.exports.getAllUser = async function getUserById(req,res){
    // console.log(req.params.username);
    // console.log(rew.param);
    let users=await userModel.find();
    try{
    if(users)
    res.json({
       message :"user retrieved",
       data:users 
    });}
    catch(err){
        res.json({
            message :err.message,
            //data:users 
         });
    }
}
