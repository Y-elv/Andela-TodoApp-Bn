import express, { Router } from "express";
import {
  registerUser,
  loginUser,
  deleteUser,
  deleteUserByToken,
} from "../modules/user/controller/userController";
import verifyToken from "../middlewares/verifyToken";

const userRouter = express.Router();

userRouter.post("/registerUser", registerUser);
userRouter.post("/loginUser", loginUser);
userRouter.delete("/deleteUser/:id", deleteUser);
userRouter.delete("/delete", verifyToken, deleteUserByToken);

export default userRouter;
