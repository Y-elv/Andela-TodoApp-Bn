import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();


if (process.env.MONGODB_URI) {
  mongoose.connect(process.env.MONGODB_URI, {
    serverSelectionTimeoutMS: 5000,
  });

  const db = mongoose.connection;

  db.on("error", (error) => {
    console.error("MongoDB connection error:", error);
  });

  db.once("open", () => {
    console.log("Connected to MongoDB");
  });
} else {
  console.error("MONGODB_URI is not defined in the environment variables.");
}