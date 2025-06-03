const express = require("express");
const router = express.Router();
const mongoose = require('mongoose');
const braintree = require('braintree');

//payment gateway 
var gateway = new braintree.BraintreeGateway({
    environment: braintree.Environment.Sandbox,
    merchantId: process.env.BRAINTREE_MERCHANT_ID,
    publicKey: process.env.BRAINTREE_MERCHANT_PUBLIC_KEY,
    privateKey: process.env.BRAINTREE_MERCHANT_PRIVATE_KEY,
  });


router.get('/getFooditems' , async(req , res)=>{
    try {
        const foodData = await mongoose.connection.db.collection("foodSample");
        const data = await foodData.find({}).toArray();
        if(data){
            console.log(data);
            res.send({success : true , data : data});
        }else{
            res.send({success : false , message : "no food items present"});
        }
    } catch (error) {
        console.log(error);
        res.send({message : "error in getFooditms route" , success: false})
    }
})
router.get('/getCategory' , async(req , res)=>{
    try {
        const catData =  mongoose.connection.db.collection("category");
        const data = await catData.find({}).toArray();
        if(data){
            console.log(data);
            res.send({success : true , data : data});
        }else{
            res.send({success : false , message : "no category is found"});
        }
    } catch (error) {
        console.log(error);
        res.send({message : "error in getCategory route" , success: false})
    }
});

// route to fetch food itm of a given category
router.get('/foodofsinglesamecat/:catname' , async (req , res)=>{
    try {
        const {catname} = req.params;
        const foodData = await mongoose.connection.db.collection("foodSample");
        const data = await foodData.find({CategoryName:catname}).toArray();
        if(data.length){
            return res.send({success : true , data});
        }
        return res.send({success:false , message : "Nothing is found for this category"});
    } catch (error) {
        console.log(error);
        res.send({message : "error in foodofsinglesamecat route" , success: false})
    }
})

// route to get this food item as per given id
router.get("/getsingleFood/:id" , async(req , res)=>{
    try {
        
        var id = new mongoose.Types.ObjectId( req.params.id);
        console.log(id);
        const foodSingle = await mongoose.connection.db.collection("foodSample");
        const foodData = await foodSingle.find({_id : id}).toArray();
        // console.log(data);
        if(foodData.length){
            return res.send({success : true , foodData});
        }
        return res.send({success:false , message : "Nothing is found for this Id" , foodData});
    } catch (error) {
        console.log(error);
        res.send({message : "error in getsingleFood route" , success: false})
    }
});
//payments routes
//token
router.get("/braintree/token", async (req , res)=>{
    try {
        gateway.clientToken.generate({}, function (err , response) {
          if (err) {
            res.status(500).send(err);
          } else {
            res.send(response);
          }
        });
      } catch (error) {
        console.log(error);
      }
});

//payments
router.post("/braintree/payment", async (req, res)=>{
    try {
        const { nonce, cart } = req.body;
        let total = 0;
        cart.map((i) => {
          total += i.price;
        });
        let newTransaction = gateway.transaction.sale(
          {
            amount: total,
            paymentMethodNonce: nonce,
            options: {
              submitForSettlement: true,
            },
          },
          function (error, result) {
            if (result) {
            //   const order = new orderModel({
            //     products: cart,
            //     payment: result,
            //     buyer: req.user._id,
            //   }).save();
              res.json({ ok: true });
            } else {
              res.status(500).send(error);
            }
          }
        );
      } catch (error) {
        console.log(error);
      }
});

module.exports = router;