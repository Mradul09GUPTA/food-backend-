const express = require("express");

const cookies = require('cookie-parser')
const app=express();
app.use(express.json());
const userModel =require('../models/userModels');
var jwt = require('jsonwebtoken');
const JWT_KEY='asdfghjkl';
app.use(cookies());

//signup
 module.exports.signup=async function signup(req,res){
    try{
    let dataobj=req.body;
    let user=await userModel.create(dataobj);
    if(!user){
        return  res.json({
            message:"error"
        });
    }
    else{
     return  res.json({
        message:"data received",
        data:user
    });
}
}
    catch(err){
        res.json({
            message: err.message
        });
    }
}

//login
module.exports.login=async function login(req,res){
    try{
    let data=req.body;
    console.log(data.email);
    if(data.email){
    let user =  await userModel.findOne({email:data.email});
    console.log(user);
    if(user){
        if(user.password==data.password){
            let uid=user['_id'];
            var token = jwt.sign({ payload:uid }, JWT_KEY);
            res.cookie('login',token,{httpOnly:true});
            return res.json({
                message:"user has logg in ",
                userDetail:data
            })
        }
        else{
            return res.json({
                message:"user has not found  ",
                //userDetail:data
            })
        }
    }
    else{
        return res.json({
            message:"user has not found  ",
            //userDetail:data
        })
    }
}
else{
    return res.json({
        message:"email is not ",
        //userDetail:data
    }) 
}}
catch(err){
   res.json({
    message:err.message
   })
}
}

//authrise
module.exports.isAuthorised=function isAuthorised(role){
    return function (req,res,next){
        if(role.includes(req.role)==true){
        next();
    }
    else
    res.status(404).json({
        message:"not valid user"
    })
}
}
//ProtectRoute
module.exports.protectRoute=async function protectRoute(req,res,next){
    console.log(req.cookies);
    try{
        let token;
        if (req.cookies.login){
              console.log(req.cookies.login);
              token =req.cookies.login;
              let payload =jwt.verify(token,JWT_KEY);
             if(payload){
                console.log("payload:",payload);
                 const user =await userModel.findById(payload.payload);
                 req.role=user.role;  
                 req.id=user.id; 
                 console.log(req.role);
                 console.log(req.id);
                 next();
            }

        }
        else{
            //brower
            const client=req.get('User-Agent');
            if(client.includes("Mozilla")==true){
                return res.redirect('/login');

            }
            //postman
            return res.json({
                message:'please loggin again'
             })
        }
    }
    catch(err){
        return res.json({
            message:err.message,
            messages:"qwertyu"
         })
    }
}

//forgetpassword
 module.exports.forgetpassword= async function forgetpassword(req,res)
{
    let{email}=req.body;
    try{
        const user= await userModel.findOne({email:email});
        if(user){
            // to create new token 
            const resetToken=user.createResetToken();
           //http://abc.com/resetpassword/resetToken
          let resetPasswordLink=`${req.protocol}://${req.get('host')}/resetpassword/${resetToken}`
        }
        else{
            return req.json( {
                    message:"please signup"
                })
        }
    }
    catch(err){
        req.status(500).json(
            {
                message:err.message
            }
        )
    }
}

//resetpassword
module.exports.resetpassword= async function resetpassword(req,res){
    try{
    const token=req.parmas.token;
    let{password,confirmPassword}=req.body;
    const user = await userModel.findOne({resetToken:token});
    if(user){
    //resetPasswordHandler will save update user in db
    user.resetPasswordHandler(password,confirmPassword);
    await user.save();
    res.json({
        message:"password has change successfully"
    });}
    else{
        res.json({
            message:"user not found"
        }); 
    }
}
catch(err){
    res.json({
        message:err.message
    });
}
} 

//logout
module.exports.logout= function logout(req,res){
    res.cookie('login',' ',{maxAge:1});
    res.json({
        message:"user logout successfully"
    })

}