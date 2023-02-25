const express = require('express');
const app=express();


//var bcrypt = require('bcryptjs');
const userRouter =express.Router();

//const planModel=require('../models/planmodel');

const planRouter =express.Router();


const {protectRoute, isAuthorised}=require('../controller/authController');
//const { create } = require('../models/planmodel');
const {getAllPlans,getPlan,createPlan,updatePlan,deletePlan}=require('../controller/planController')

//all plans leke ane ke liye 
planRouter.route('/allPlans')
.get(getAllPlans);

//own plan->login is necessary
planRouter.use(protectRoute);
planRouter.route('/plans/:id')
.get(getPlan);

//admin and restaurent can change the plan 
planRouter.use(isAuthorised(['admin','restaurantowner']));

planRouter
.route('/crudPlan')
.post(createPlan);

planRouter.route('/crudPlan/:id')
.patch(updatePlan)
.delete(deletePlan);

module.exports=planRouter;