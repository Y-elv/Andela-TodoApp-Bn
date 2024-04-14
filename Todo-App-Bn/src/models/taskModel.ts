import mongoose, { Document } from "mongoose";

interface Task extends Document {
  title: string;
  description: string;
  completed: boolean;
  timestamp: Date;
}

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 200,
      unique: true,
    },
    description: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 1024,
    },
    completed: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const taskModel = mongoose.model<Task>("Task", taskSchema);

export default taskModel;
export { Task };
