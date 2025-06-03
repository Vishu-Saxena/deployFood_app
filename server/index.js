const express = require("express");
const userRoute = require("./router/routeuser");
const foodRoute = require("./router/foodroute");
const orderHistory = require('./router/orderRoute')
const cors = require('cors')
// importing connection function
const DB_connection = require("./dbconn");
const dotenv = require("dotenv");
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

DB_connection(); // invoked databse connection
app.get('/' , (req ,res)=>{
    res.send("Hi");
});

app.use('/api/user' , userRoute);
app.use('/api/food' , foodRoute);
app.use('/api/ordershistory' , orderHistory);

const PORT = process.env.PORT || 3000;
app.listen(PORT , ()=>{
    console.log("server running on port no " + PORT);
})