import mongoose from "mongoose";
import dotenv from 'dotenv'
dotenv.config();
const dbconnect = process.env.DBCONNECT
function connecttoDB (){
    mongoose.connect(dbconnect).then(()=>{
        console.log("Connect to DB")
    }).catch(err=>console.log(err))

}

export default connecttoDB