import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import express, { Express, Request, Response } from "express";
import userRouter from "./routers/userRouter";
import taskRouter from "./routers/taskRouter";
import "./database/config/database"
dotenv.config();
const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to Todo App Apis...");
});
app.use("/api/v1/todoApp/user", userRouter);
app.use("/api/v1/todoApp/task", taskRouter);

let server: any;

server = app.listen(PORT, () => {
  console.log(`App listening on http://localhost:${PORT}`);
});

export default app;
