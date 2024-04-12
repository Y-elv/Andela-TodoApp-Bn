import express, { Router } from "express";
import {
  registerUser,
  loginUser,
 
} from "../controllers/userRegister";



const userRouter = express.Router();

userRouter.post("/registerUser", registerUser);
userRouter.post("/loginUser", loginUser);


export default userRouter;
