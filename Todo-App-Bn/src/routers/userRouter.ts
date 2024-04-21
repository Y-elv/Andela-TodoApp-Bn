import express, { Router } from "express";
import {
  registerUser,
  loginUser,
  deleteUser,
} from "../modules/user/controller/userController";

const userRouter = express.Router();

userRouter.post("/registerUser", registerUser);
userRouter.post("/loginUser", loginUser);
userRouter.delete("/deleteUser/:id", deleteUser);

export default userRouter;
