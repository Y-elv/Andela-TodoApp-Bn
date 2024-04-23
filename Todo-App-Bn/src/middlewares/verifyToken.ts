import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import UserModel, { User } from "../database/models/user";




const secretKey = process.env.JWT_SECRET_KEY;

const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized - Missing token" });
  }

  const token = authHeader.split(" ")[1];

  console.log("token :", token);

  try {
    const decoded = jwt.verify(token, secretKey as string) as unknown as {
      _id: string;
      email: string;
    };
    const user = await UserModel.findById(decoded._id).select("-password");

    // if (!user) {
    //   throw new Error("User not found");
    // }

    console.log("decoded", decoded);

     (req as any).user = decoded;

    next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized - Invalid token" });
  }
};

export default verifyToken;
