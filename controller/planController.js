const planModel=require('../models/planmodel');
const express = require('express');
const app=express();
app.use(express.json())
module.exports.getAllPlans=async function getAllPlans(req,res){
    let plans=await planModel.find();
    try{
    if(plans){
        return res.json({
            message : "all plan",
            data:plans
        })
    }
    else{
        return res.json({
            message:"plans not found"
        })
    }

}
catch(err)
{
    return res.status(500).json({
        message:err.message
    })  
}}

module.exports.getPlan=async function getPlan(req,res){
    let id =req.params.id;
    let plan=await planModel.findById(id);
    try{
    if(plan){
        return res.json({
            message : "a plan retrived",
            data:plan
        })
    }
    else{
        return res.json({
            message:"plans not found"
        })
    }

}
catch(err)
{
    return res.status(500).json({
        message:err.message
    })  
}}
 
module.exports.createPlan= async function createPlan(req,res){
    try{
        let planData=req.body;
    let plan =await planModel.create(planData);
    return res.json({
        message:"plans create succ",
        data:plan
    })}
    catch(err){
        res.status(500).json({
            message:err.message
        })
   
}}

module.exports.deletePlan= async function deletePlan(req,res){
    try{
        let id=req.params.id;
    let plan =await planModel.findByIdAndDelete(id);
    return res.json({
        message:"plans delete succ",
        data:plan
    })}
    catch(err){
        res.status(500).json({
            message:err.message
        })
   
}}
 
module.exports.updatePlan =async function updatePlan(req,res){
    try{
        let id =req.params.id;
        let dataToUpdate=req.body;
        let keys=[];
        for(let key in dataToUpdate){
            keys.push(key);
        }
        let plan=await planModel.findById(id);
        for(let i=0;i<keys.length;i++){
            plan[keys[i]]=dataToUpdate[keys[i]];
        }
        await plan.save();
    }
    catch(err){
        res.status(500).json({
            message:err.message
        })
   
    }
}

//get top3plan
module.exports.top3plan= async function top3plan(req,res){
    try{
        const plan= await planModel.find().sort({
            ratingAverage:-1
        }).limit(3);
        return res.json({
            message:"top3plan",
            data:plan
        })
    }
    catch(err){
        res.status(500).json({
            message:err.message
        })
   
    }
}
