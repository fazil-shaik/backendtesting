import mongoose from "mongoose";
import dotenv  from "dotenv";
dotenv.config();
const Connect = async()=>{
    try {
        await mongoose.connect(process.env.DATABASE_URL!);
        console.log("Database connected successfully");
        // console.log("Connected to DB:", mongoose.connection.db?.databaseName);
    } catch (error) {
        console.log("Error while connecting to database",error);
    }
}

export default Connect;