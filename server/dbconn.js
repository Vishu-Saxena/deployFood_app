const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const DB_connection = async()=>{
    try {
        await mongoose.connect(process.env.CONNECTIONSTRING);
        console.log("connected to database");
        const fetched_data = await mongoose.connection.db.collection("foodSample");
        const data = await fetched_data.find({}).toArray();
        if(data){
            console.log(data);
        }else{
            console.log("nothing found");
        }
    } catch (error) {
        console.log("error in connecting database");
        console.log(error);
    }
    
}

module.exports = DB_connection