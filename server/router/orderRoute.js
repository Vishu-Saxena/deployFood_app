const orders = require('../models/orderHistorySchema');
const express = require('express');
const router = express.Router();
const mongoose = require("mongoose");

// route to add order to orderhistory

router.post('/addOrders' , async(req , res)=>{
    try {
        const {name , img , qty , price , subtotal , userId} = req.body;
        console.log(req.body);
        if(!name || !img || !qty || !price || !subtotal || !userId){
            return res.send({message : "Incomplete information" , success : false})
        }

        const data =  await orders.create({name , img , quantity : qty , price , subtotal , userId});

        res.status(200).json({message : data , success : true , message : "order saved successfuly"});
    } catch (error) {
        console.log(error);
        res.send({message : "error in order adding route" , success : false})
    }
} )

// route to fetch the orders
router.get('/getorders/:userid' , async(req ,res)=>{
    try {
        const {userid} = req.params;
        const getOrders = await orders.find({userId : userid}).sort({OrderDate : -1});
        if(getOrders.length){
           return res.send({message : "orders fetched successfully" , getOrders})
        }
        return res.send({message : "NO order history is there" , success : false})
    } catch (error) {
        console.log(error);
        res.send({message : "error in order getting route" , success : false})
    }
})

// route to delete single order
router.delete('/deleteOrder/:id' , async(req , res)=>{
    try {
        const id = req.params.id;
        if(id){
            const delOrder = await orders.findByIdAndDelete(id);
            console.log(delOrder);
            if(delOrder){
                return res.send({message : "orders deleted successfully" , success : true})
            }

            return res.send({message : "orders not deleted successfully"})
        }
    } catch (error) {
        console.log(error);
        res.send({message : "error in order deleting route" , success : false})
    }
})

module.exports = router;