import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const MONGODB_URL = "mongodb+srv://navodyatheshan4_db_user:ZOId7jbikOuGU6PN@toystore.dixr9mo.mongodb.net/?appName=toystore";
    if (!MONGODB_URL) {
      throw new Error("MONGODB_URL is not defined");
    }
    await mongoose.connect(MONGODB_URL);
    console.log("Connected to MongoDB");
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error connecting to MongoDB:", error.message);
    } else {
      console.error("Error connecting to MongoDB:", error);
    }
    process.exit(1);
  }
};

export default connectDB;
