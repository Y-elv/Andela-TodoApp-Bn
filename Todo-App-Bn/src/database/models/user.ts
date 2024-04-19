import mongoose, { Document } from "mongoose";

interface User extends Document {
  email: string;
  password: string;
  timestamp: Date;
}

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 200,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 1024,
    },
  },
  {
    timestamps: true,
  }
);

const userModel = mongoose.model<User>("User", userSchema);

export default userModel;
export { User };
