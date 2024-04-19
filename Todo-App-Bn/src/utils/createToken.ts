import jwt from "jsonwebtoken";
const createToken = (_id: string, email: string): string => {
  const jwtkey = process.env.JWT_SECRET_KEY as string;
  const token = jwt.sign({ _id, email }, jwtkey);
  return `Bearer ${token}`;
};
export default createToken;
