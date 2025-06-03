const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    img :{
        type : String
    },
    quantity : {
        type : Number,
        required : true
    },
    price : {
        type : Number,
        required : true
    },
    subtotal : {
        type : Number,
        required : true
    },
    OrderDate : {
        type : Date,
        default : Date.now()
    },
    userId : {
        type : String, 
        required : true
    }
})
module.exports = mongoose.model("orderHistory" , OrderSchema)