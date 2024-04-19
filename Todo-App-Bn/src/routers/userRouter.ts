import express, { Router } from "express";
import {
  registerUser,
  loginUser,
 
} from "../modules/user/controller/userController";



const userRouter = express.Router();

userRouter.post("/registerUser", registerUser);
userRouter.post("/loginUser", loginUser);


export default userRouter;
