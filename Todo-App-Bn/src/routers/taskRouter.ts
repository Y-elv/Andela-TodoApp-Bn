import express from "express";
import {
  createTask,
  readTaskById,
  readAllTask,
  updateTaskById,
  deleteTaskById,
  deleteAllTask,
} from "../controllers/task";
import verifyToken from "../middlewares/verifyToken";

const taskRouter = express.Router();

taskRouter.post("/createTask", verifyToken, createTask);

taskRouter.get("/readAll", verifyToken, readAllTask);

taskRouter.get("/readById/:taskId", verifyToken, readTaskById);

taskRouter.put("/update/:taskId", verifyToken, updateTaskById);

taskRouter.delete("/deleteTask", verifyToken, deleteAllTask);

taskRouter.delete("/delete/:taskId", verifyToken, deleteTaskById);

export default taskRouter;
