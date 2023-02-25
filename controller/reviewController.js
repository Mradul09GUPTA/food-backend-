const reviewModel =require("../models/reviewModel");

const planModel = require("../models/planmodel");

//getallreviews
module.exports.getAllReviews= async function getAllReviews(req,res){
    try
    {
        const reviews = await reviewModel.find();
        if(reviews){
            return res.json({
                message:"reviews retriever",
                data:reviews
            })
        }
        else{
            return res.json({
                message:"review not found",
                //data:reviews
        })
    }
}
    catch(err){
        return res.json({
            message:err.message,
            //data:reviews
    })
    }
}

//top3reviews
module.exports.top3Reviews= async function top3Reviews(req,res){
    try
    {
        const reviews = await reviewModel.find().sort({rating:-1}).limit(3);
        if(reviews){
            return res.json({
                message:"reviews retriever",
                data:reviews
            })
        }
        else{
            return res.json({
                message:"review not found",
                //data:reviews
        })
    }
}
    catch(err){
        return res.json({
            message:err.message,
            //data:reviews
    })
    }
}

//getPlanReviews
module.exports.getPlanReviews= async function getPlanReviews(req,res){
    try
    {    const id=req.params.id;
        const reviews = await reviewModel.findById(id);
        if(reviews){
            return res.json({
                message:"reviews retriever",
                data:reviews
            })
        }
        else{
            return res.json({
                message:"review not found",
                //data:reviews
        })
    }
}
    catch(err){
        return res.json({
            message:err.message,
            //data:reviews
    })
    }
}

//createreview
module.exports.createReview=async function createReview(req,res){
    try{
    let id =req.params.plan;
    
    const plan =await planModel.findById(id);
    const review=await reviewModel.create(req.body);
    plan.ratingsAverage=(plan.ratingsAverage+review.rating)/2;
     await plan.save();
     res.json({
        message:"reviews",
        data:reviews
    })}
    catch(err){
       return  res.json({
            message:"reviews retriever",
            data:reviews
        })
    }
     
     
}

module.exports.updateReview=async function updateReview(req,res){
   try{ let id =req.params.id;
   
    let dataToUpdate=req.body;
        let keys=[];
        for(let key in dataToUpdate){
            keys.push(key);
        }
        let review =await reviewModel.findById(id);
        for(let i=0;i<keys.length;i++){
            review[keys[i]]=dataToUpdate[keys[i]];
        }
        await review.save();
    }
    catch(err){
        res.status(500).json({
            message:err.message
        })
   
    }
}

module.exports.deleteReview= async function deletePlan(req,res){
    try{
        let id=req.params.id;
    let review =await planModel.findByIdAndDelete(id);
    return res.json({
        message:"plans delete succ",
        data:review
    })}
    catch(err){
        res.status(500).json({
            message:err.message
        })
   
}}
