const express = require('express');
const userRouter = express.Router();
const {UserModel} = require('../model/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const {authenticate} = require('../middleware/authenticate');



userRouter.post('/register',async(req,res)=>{
    const {name,password,city} = req.body;
    const unique = (name+password)
    let score = req.body.score? req.body.score : 0;
    const user = await UserModel.find({unique});
    console.log(user)
    if(user[0]){
        res.send({"msg":'user already exist'})
    }else{
        try{
            bcrypt.hash(password,3,async(err,hash)=>{
                if(err){
                    res.send('something went wrong while hashing the password');
                }else{
                    const user = new UserModel({name,password:hash,city,unique,score})
                    await user.save();
                    res.send({"msg":'registered'})
                }
            })
        }catch(e){
            res.send({"e":e.message})
        }
    }
   
});

userRouter.post('/login', async(req,res)=>{
    const {name,password} = req.body;
    let unique = (name+password)
    try{
        const user = await UserModel.find({unique});
        const token = jwt.sign({userId : user[0]._id},process.env.key);
        if(user.length){
            bcrypt.compare(password,user[0].password,function(err,result){
                if(result){
                    res.send({"token":token})
                }else{
                    res.send({"msg":"password mismatched"})
                }
            })
        }else{
            res.send({"msg":"user not found"})
        }
    }catch(e){
        res.send({"e":e.message})
    }
})

userRouter.use(authenticate);

userRouter.get('/',async(req,res)=>{
    try{
       const users =await UserModel.find();
        res.send(users)
    }catch(e){
        res.send({"e":e.message})
    }
})


userRouter.patch('/update',async(req,res)=>{
    let ID = req.body.user
    let score = req.body.score
    let payload = {score}
   try{
       const user = await UserModel.findOne({_id : ID});
       
        await UserModel.findByIdAndUpdate({_id:ID},payload);
        res.send({"msg":"updated"})
   }catch(e){
      res.send({"e":e.message})
   }
})

module.exports={
    userRouter
}