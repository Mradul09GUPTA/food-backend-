//pepcoding backdev foodapp
//user plan review rotuer checked _______________
const express = require('express');
const app=express();
app.listen(4000);
app.use(express.json());
//var bcrypt = require('bcryptjs');
const userRouter =express.Router();
const cookies = require('cookie-parser');
//const planModel=require('../models/planmodel');
app.use(cookies());

//const protectRoute=require('./authHelper');
const{getUser,getAllUser,updateUser,deleteUser}=require('../controller/userController');
const{signup,login,isAuthorised,protectRoute,forgetpassword,resetpassword,logout}=require('../controller/authController');
//    /user define 
 const planRouter=require('../Routers/planRouter');
 const reviewRouter=require('../Routers/reviewRouter');
   
app.use('/user',userRouter);
app.use('/plan',planRouter);
app.use('/review',reviewRouter);

//user ke option 
userRouter
.route('/:id')
.patch(updateUser)
.delete(deleteUser);

//signup
userRouter
.route('/signup')
.post(signup);

//login
userRouter
.route('/login')
.post(login);

//forgetpassword
userRouter
.route('/forgetpassword')
.post(forgetpassword);

//resetpassword
userRouter
.route('/resetpassword/:token')
.post(resetpassword);

//logout
userRouter
.route('/logout')
.get(logout);

//profie
userRouter.use(protectRoute);
userRouter
.route('/userProfile')
.get(getUser) ;

//admin
userRouter.use(isAuthorised(['admin']));
userRouter
.route('')
.get(getAllUser);


 //ngfdfghj
module.exports=userRouter;
