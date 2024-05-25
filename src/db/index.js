import mongoose from "mongoose";
import {DB_NAME} from "../constants.js";

const connectDB = async()=>{
    try {
        const connectInst=await mongoose.connect(`${process.env.MONGODBURI}/${DB_NAME}`)
        console.log(`\n MONGODB connection done:${connectInst.connection.host}`)
    } catch (error) {
        console.log("MONGODB connection error:",error)
        process.exit(1);
    }
};
export default connectDB;

