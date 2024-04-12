import mongoose from "mongoose";
import os from "os";
import cors from "cors";
import dotenv from "dotenv";
import express, { Express, Request, Response } from "express";
import userRouter from "./routers/userRouter";
dotenv.config();
const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

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
app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to Todo App Apis...");
});
app.use("/api/v1/todoApp/user", userRouter);

let server: any;

server = app.listen(PORT, () => {
  console.log(`App listening on http://localhost:${PORT}`);
});

export default app;
