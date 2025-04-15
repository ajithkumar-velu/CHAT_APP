import mongoose from "mongoose";
import dotenv from 'dotenv'
dotenv.config()
const connectDb = async ()=>{
    try {
        await mongoose.connect(process.env.MONGODB_URL)
        console.log("MongoDB is conncted");
    } catch (error) {
        console.log("Error in connecting to MongoDB", error);
    }
}
export default connectDb