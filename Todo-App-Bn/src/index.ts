
import cors from "cors";
import dotenv from "dotenv";
import express, { Express, Request, Response } from "express";
import router from "./routers/index";
import "./database/config/database";
dotenv.config();
const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to Todo App Apis...");
});
app.use("/api", router);

let server: any;

server = app.listen(PORT, () => {
  console.log(`App listening on http://localhost:${PORT}`);
});

export default app;
