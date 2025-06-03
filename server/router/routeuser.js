const express = require('express');
const user = require("../models/userSchema");
const jwt = require("jsonwebtoken");
const router = express.Router();
const {hashPassword , comparePassword} = require("../securityHelper/authHelper");
const dotenv = require("dotenv");
dotenv.config();

router.post("/signup" , async(req ,res)=>{
    try {
        const {name , email , password , location } = req.body;
        // checking whether user already exist or not
        const userCheck = await user.findOne({email});
        if(userCheck){
           return res.status(201).json({message : "User with these credential already exist" , success : false});
        }
        const data =  await user.create({  
            name : name,
            email : email,
            password : await hashPassword(password),
            location : location
            
        })
        res.status(200).json({message : data , success : true , message : "user signed up successfuly"});
    } catch (error) {
        console.log(error);
        res.send({message : "error in sign up route" , success : false})
    }
})

router.post("/login" , async(req ,res)=>{
    try {
        const {email , password} = req.body; //getting user data 
        const checkUser = await user.findOne({email}); //finding user with given email

        if(checkUser === null){
            return res.status(200).json({message : "Wrong credentials" , success : false})
        }
        const ismatch = await comparePassword(password , checkUser.password);
        if(!ismatch){
            return res.status(200).json({message : "Wrong credentials" , success : false});
        }
        const data = {
           userInfo : {
            id : checkUser._id
           }
        }
        const authtoken = jwt.sign(data , process.env.SECRETKEY);
        return res.status(200).json({message : "user logged in successfully" ,authtoken : authtoken , success: true}); // save this authtoken to localhost while loggin in from frontend
    } catch (error) {
        console.log(error);
        res.send({message : "error in login route" , success : false});
    }
})

module.exports = router;