import mongoose from "mongoose";
import { seedAdminUser } from "../utils/seedAdmin";

export const connectDB = async () => {
  try {
    const uri = process.env.MONGODB_URI as string;
    if (!uri) {
      throw new Error("MONGODB_URI not defined");
    }
    await mongoose.connect(uri);
    console.log("MongoDB connected");
      await seedAdminUser(); 

  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
};
