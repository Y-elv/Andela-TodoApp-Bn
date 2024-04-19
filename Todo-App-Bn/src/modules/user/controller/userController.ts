import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import {createUser, findUserByEmail} from "../repository/userRepository"
import { encryptPassword, comparePassword } from "../../../utils/password"

dotenv.config();
const createToken = (_id: string, email: string): string => {
  const jwtkey = process.env.JWT_SECRET_KEY as string;
  const token = jwt.sign({ _id, email }, jwtkey);
  return `Bearer ${token}`;
};
const registerUser = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;
  const user = await findUserByEmail(email);
  if (user) return res.json({ status: false, message: "User already exist." });
  const hashedPassword = await encryptPassword(password);
  const newUser = {
    name: name,
    email: email,
    password: hashedPassword,
  };
  const newCreatedUser = await createUser(newUser);
  res.json({ status: true, message: " Successfully registered." });
};

const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user = await findUserByEmail(email);
  if (!user) return res.json({ status: false, message: "Invalid credentials" });
  const passwordMatches = await comparePassword(password, user.password);
  if (!passwordMatches)
    return res.json({ status: false, message: "Invalid credentials" });
   const token = createToken(user._id, user.email);
  res.json({ status: true, message: { token } });
};
export { registerUser, loginUser };
