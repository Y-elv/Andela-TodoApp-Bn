import express from "express";
import {
  addTodo,
  completeTodo,
  deleteTodo,
  getAllTodos,
  getTaskById,
  unCompleteTodo,
  updateTodo,
} from "../modules/task/controller/taskController";
import verifyToken from "../middlewares/verifyToken";
const todoRoutes = express.Router();

todoRoutes.post("/createTask", verifyToken, addTodo);
todoRoutes.get("/getAll", verifyToken, getAllTodos);
todoRoutes.get("/getTask/:id", verifyToken, getTaskById);
todoRoutes.patch("/update/:id", verifyToken, updateTodo);
todoRoutes.patch("/complete/:id", verifyToken, completeTodo);
todoRoutes.patch("/unComplete/:id", verifyToken, unCompleteTodo);
todoRoutes.delete("/delete/:id", verifyToken, deleteTodo);

export default todoRoutes;
