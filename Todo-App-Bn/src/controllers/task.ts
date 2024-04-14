import { Request, Response } from "express";
import TaskModel, { Task } from "../models/taskModel";

const createTask = async (req: Request, res: Response): Promise<void> => {
  try {
    const data: Task = req.body;

    let taskInstance = new TaskModel({
      title: data.title,
      description: data.description,
      completed: data.completed,
    });

    const savedData = await taskInstance.save();
    res.status(200).json({
      message: "Data saved successfully",
      error: null,
      data: savedData,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to save the data",
      error: "Failed",
    });
  }
};

const readAllTask = async (req: Request, res: Response): Promise<void> => {
  try {
    const result = await TaskModel.find({}).sort({
        createdAt: -1,
      });
    if (result.length === 0) {
      res.status(400).json({
        message: "There is no data saved yet",
        data: result,
      });
    } else {
      res.status(200).json({
        message: "Data retrieved successfully",
        data: result,
        error: null,
      });
    }
  } catch (error) {
    res.status(500).json({
      data: null,
      message: "Failed to retrieve data",
      error: "Internal server error",
    });
  }
};

const readTaskById = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = req.params.taskId;
    const enteredId = { _id: id };

    const result = await TaskModel.find(enteredId);
    if (result.length === 0) {
      res.status(400).json({
        message: `No data found with ID: ${id}`,
        data: result,
      });
    } else {
      res.status(200).json({
        message: `Data with ID ${id} retrieved successfully`,
        data: result,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Failed",
      error: "Internal server error",
    });
  }
};

const updateTaskById = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = req.params.taskId;
    const bodyEntered = req.body;

    const foundData = await TaskModel.find({ _id: id });
    if (!foundData) {
      res.status(404).json({
        message: `Task with ID ${id} not found`,
        error: "Task not found",
      });
    } else {
      const result = await TaskModel.findOneAndUpdate(
        {_id:id},
        {$set:bodyEntered}
      );
      res.status(200).json({
        message: `Data with ID ${id} updated successfully`,
        data: result,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      error: error,
    });
  }
};

const deleteAllTask = async (req: Request, res: Response): Promise<void> => {
  try {
    const result = await TaskModel.deleteMany({});
    res.status(200).json({
      message: "All tasks have been deleted",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      error: error,
    });
  }
};

const deleteTaskById = async (req: Request, res: Response): Promise<void> => {
  try {
    const enteredId = req.params.taskId;

    const foundData = await TaskModel.findById(enteredId);
    if (!foundData) {
      res.status(400).json({
        message: `No data found with ID: ${enteredId}`,
        error: "Not found",
      });
    } else {
      const result = await TaskModel.findByIdAndDelete(enteredId);
      res.status(200).json({
        message: `Task with ID ${enteredId} deleted successfully`,
        data: result,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      error: error,
    });
  }
};

export {
  createTask,
  readTaskById,
  readAllTask,
  updateTaskById,
  deleteTaskById,
  deleteAllTask,
};
