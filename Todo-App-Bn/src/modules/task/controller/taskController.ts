import { Request, Response } from "express";
import {
  createTodo,
  deleteTodoById,
  findTodoById,
  getTodos,
  updateTodoById,
} from "../repository/taskRepository";

const addTodo = async (req: Request, res: Response) => {
  const { title, description, completed } = req.body;
  const userId = (req as any).user._id;
  const newTodo = {
    title,
    description,
    completed,
    userId
  };
  const newCreatedTodo = await createTodo(newTodo);
  res.json({
    status: true,
    message: newCreatedTodo,
    todoId: newCreatedTodo._id,
  });
};

const getAllTodos = async (req: Request, res: Response) => {
  const userId = (req as any).user._id;
  const todos = await getTodos(userId);
  res.json({ status: true, message: todos });
};

const deleteTodo = async (req: Request, res: Response) => {
  const id = req.params.id;
  const todo = await findTodoById(id);
  if (!todo) return res.json({ status: false, message: "Todo doesn't exist." });
  const { deletedCount } = await deleteTodoById(id);
  if (deletedCount < 1)
    res.json({ status: false, message: "Failed to delete Todo" });
  else res.json({ status: true, message: "Deleted." });
};

const updateTodo = async (req: Request, res: Response) => {
  const { title, description, completed } = req.body;
  const id = req.params.id;
  const todo = await findTodoById(id);
  if (!todo) return res.json({ status: false, message: "Todo doesn't exist." });
  const updatedTodo = await updateTodoById(id, {
    title,
    description,
    completed,
  });
  if (updatedTodo.modifiedCount > 0)
    res.json({ status: true, message: "Todo updated successfully" });
  else res.json({ status: false, message: "Failed to update Todo" });
};

const completeTodo = async (req: Request, res: Response) => {
  const id = req.params.id;
  const todo = await findTodoById(id);
  if (!todo) return res.json({ status: false, message: "Todo doesn't exist." });
  const updatedTodo = await updateTodoById(id, { completed: true });
  if (updatedTodo.modifiedCount > 0)
    res.json({ status: true, message: "Todo marked as completed." });
  else res.json({ status: false, message: "Failed to update Todo" });
};

const unCompleteTodo = async (req: Request, res: Response) => {
  const id = req.params.id;
  const todo = await findTodoById(id);
  if (!todo) return res.json({ status: false, message: "Todo doesn't exist." });
  const updatedTodo = await updateTodoById(id, { completed: false });
  if (updatedTodo.modifiedCount > 0)
    res.json({ status: true, message: "Todo marked as uncompleted." });
  else res.json({ status: false, message: "Failed to update Todo" });
};

const getTaskById = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const todo = await findTodoById(id);
    if (!todo) {
      throw new Error("Task not found");
    }
    res.json({ status: true, message: todo });
  } catch (error) {
    console.error("Error fetching task by ID:", error);
    return null;
  }
};

export {
  addTodo,
  getAllTodos,
  deleteTodo,
  updateTodo,
  completeTodo,
  unCompleteTodo,
  getTaskById,
};
