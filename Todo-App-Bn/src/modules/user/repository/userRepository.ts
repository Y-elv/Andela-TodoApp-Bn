import UserModel, {User} from "../../../database/models/user";

const createUser = async (body: any) => {
  return await UserModel.create(body);
};

const findUserByEmail = async (email: string) => {
  return await UserModel.findOne({ email });
};

export { createUser, findUserByEmail };
