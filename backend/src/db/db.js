import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

const connectDB = async ()=>{
    try{
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
        console.log(`\nMongoDB connected !! DB Host : ${connectionInstance.connection.host}`);
    }
    catch(error)
    {
        console.log("MongoDB connection error :",error);
    }
}
export default connectDB;