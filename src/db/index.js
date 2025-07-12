import mongoose from "mongoose";
import "dotenv/config";

const DB_NAME = "";
const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGODB_URI}/${DB_NAME}`
    );
    console.log(
      `\n MongoDB Connected ! DB host: ${connectionInstance.connection.host}`
    );
  } catch (error) {
    console.error(`Error connecting to mongoDB servers ${error}`);
    process.exit(1);
  }
};

export default connectDB;
