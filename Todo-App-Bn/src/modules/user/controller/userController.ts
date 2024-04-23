import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { createUser, findUserByEmail } from "../repository/userRepository";
import { encryptPassword, comparePassword } from "../../../utils/password";
import createToken from "../../../utils/createToken";
import userModel from "../../../database/models/user";

dotenv.config();

const registerUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user = await findUserByEmail(email);
  if (user) return res.json({ status: false, message: "User already exist." });
  const hashedPassword = await encryptPassword(password);
  const newUser = {
    email: email,
    password: hashedPassword,
  };
  const newCreatedUser = await createUser(newUser);
  res.json({
    status: true,
    message: "Successfully registered.",
    userId: newCreatedUser._id,
  });
};

const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user = await findUserByEmail(email);

  if (!user) {
    return res.status(401).json({ status: false, message: "User not found" });
  }

  const passwordMatches = await comparePassword(password, user.password);

  if (!passwordMatches) {
    return res
      .status(401)
      .json({ status: false, message: "Invalid Credentials" });
  }

  const token = createToken(user._id, user.email);

  res.json({ status: true, message: { token } });
};

const deleteUser = async (req: Request, res: Response) => {
  const userId = req.params.id;
  const user = await userModel.findByIdAndDelete({ _id: userId });
  if (!user) {
    return res.status(400).json({ status: false, message: "user not found" });
  } else {
    return res
      .status(200)
      .json({ status: true, message: "user deleted successfully" });
  }
};
const deleteUserByToken = async (req: Request, res: Response) => {
  const userId = (req as any).user._id;
  const user = await userModel.findByIdAndDelete({ _id: userId });
  if (!user) {
    return res.status(400).json({ status: false, message: "user not found" });
  } else {
    return res
      .status(200)
      .json({ status: true, message: "user deleted successfully" });
  }
};

export { registerUser, loginUser, deleteUser, deleteUserByToken };
