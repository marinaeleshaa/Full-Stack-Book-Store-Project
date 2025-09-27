import { User } from "../model/UserModel.js";

/** @type {import("mongoose").Model} */
const userModel = User;

export const GetAllUsers = async () => {
  const MyUsers = await userModel.find({});
  return MyUsers;
};

export const AddUser = async (data) => {
  const MyUser = await new userModel(data);
  return await MyUser.save();
};

export const GetUserByUn = async (username) => {
  const MyUser = await userModel.findOne({ username });
  return MyUser;
};

