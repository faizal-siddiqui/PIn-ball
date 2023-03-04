const express = require('express');
const userRouter = express.Router();
const {UserModel} = require('../model/userModel');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const {authenticate} = require('../middleware/authenticate');



userRouter.post('/register',async(req,res)=>{
    const {name,password,city} = req.body;
    const unique = (name+password)
    let score = req.body.score? req.body.score : 0;
    let lost = req.body.lost? req.body.lost : 0;
    let win = req.body.win? req.body.win : 0;
    let level = req.body.level? req.body.level : 1
    const user = await UserModel.find({unique});
    console.log(user)
    if(user[0]){
        res.send({"msg":'user already exist'})
    }else{
        try{
                    const user = new UserModel({name,password,city,unique,score,lost,win,level})
                    await user.save();
                    res.send({"msg":'registered'})
        }catch(e){
            res.send({"e":e.message})
        }
    }
   
});

userRouter.post('/login', async(req,res)=>{
    const {name,password} = req.body;
    try{
        const user = await UserModel.find({name,password});
        
        if(user.length){
            const token = jwt.sign({userId : user[0]._id},process.env.key);
            // bcrypt.compare(password,user[0].password,function(err,result){
            //     if(result){
            //         res.send({"token":token})
            //     }else{
            //         res.send({"msg":"password mismatched"})
            //     }
            // })
            res.send({"token":token})
        }else{
            res.send({"msg":"user not found"})
        }
    }catch(e){
        res.send({"e":e.message})
    }
})



userRouter.get('/',async(req,res)=>{
    try{
       const users =await UserModel.find();
        res.send(users)
    }catch(e){
        res.send({"e":e.message})
    }
})
userRouter.use(authenticate);

userRouter.patch('/update',async(req,res)=>{
    let ID = req.body.user
   let payload = req.body
   
   try{
    let{win, lost, level} = await UserModel.findOne({_id : ID})
    
    if(payload.win){
        win = win + payload.win
    }

    if(payload.lost){
        lost += payload.lost  
    }

    if(payload.level>level){
        level = payload.level
    }
 

    await UserModel.findByIdAndUpdate({_id:ID},{
        win,
        lost,
        level
    });

        res.send({"msg":"updated"})
   }catch(e){
      res.send({"e":e.message})
   }
})

module.exports={
    userRouter
}