import { Request, Response } from "express";
import UserModel, { User } from "../models/userModel";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import validator from "validator";
import dotenv from "dotenv";

dotenv.config();
const createToken = (_id: string, email: string): string => {
  const jwtkey = process.env.JWT_SECRET_KEY as string;
  const token = jwt.sign({ _id, email }, jwtkey);
  return `Bearer ${token}`;
};
const registerUser = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { email, password } = req.body;

    let user: User | null = await UserModel.findOne({
      email,
    });

    if (user) {
      return res.status(400).json("User with the given email already exists");
    }

    if (!email || !password) {
      return res.status(400).json("All fields are required");
    }

    if (!validator.isEmail(email)) {
      return res.status(400).json("Email must be a valid email");
    }

  

    user = new UserModel({
      email,
      password,
    });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    await user.save();

    const token = createToken(user._id, user.email);

    return res.status(200).json({
      _id: user._id,
      email: user.email,
      token,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Failed to save the data",
      error: err,
    });
  }
};

const loginUser = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { email, password } = req.body;

    const user: User | null = await UserModel.findOne({ email });

    if (!user) {
      return res.status(401).json("Invalid email or password");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json("Invalid email or password");
    }

    const token = createToken(user._id, user.email);

    return res.status(200).json({
      _id: user._id,
      email: user.email,
      token,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Failed to authenticate",
      error: err,
    });
  }
};
export { registerUser, loginUser };
