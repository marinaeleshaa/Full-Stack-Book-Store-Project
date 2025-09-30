import { GenerateToken } from "../jwt/jwtUtil.js";
import {
  AddUser,
  GetAllUsers,
  GetUserByEmail,
  GetUserByUn,
} from "../repository/UserRepository.js";
import { updateUserRole as updateUserRepo } from "../repository/UserRepository.js";

import bcrypt from "bcryptjs";

const getUsers = async () => {
  const users = await GetAllUsers();
  return users;
};

const updateUserRole = async (_id, role) => {
  if (!["user", "admin"].includes(role)) {
    throw new Error("Invalid role");
  }

  const updatedUser = await updateUserRepo(_id, role);
  if (!updatedUser) {
    throw new Error("User not found");
  }

  // حدد الـ payload اللي عايز تدخله في الـ JWT
  const payload = {
    id: updatedUser._id,
    email: updatedUser.email,
    username: updatedUser.username,
    role: updatedUser.role,
  };

  return {
    updatedUser,
    jwt: GenerateToken(payload),
  };
};

const addUser = async (body) => {
  const { email, password } = body;

  const existingEmail = await GetUserByEmail(email);
  if (existingEmail) {
    throw new Error("Email is already registered");
  }

  const hashedPassword = await bcrypt.hash(password, 12);
  const user = await AddUser({ ...body, password: hashedPassword });

  return {
    id: user._id,
    name: user.name,
    username: user.username,
    email: user.email,
    role: user.role,
  };
};

const loginService = async ({ email, password }) => {
  // todo => check if email found
  const user = await GetUserByEmail(email);
  console.log(email);
  if (!user) throw new Error("email or password invalid");

  // todo => check if matched password
  const isSuccess = await bcrypt.compare(password, user.password);
  if (!isSuccess) {
    throw new Error("email or password invalid");
  }
  const payload = {
    username: user.username,
    role: user.role,
    id: user._id,
    email: user.email,
  };
  return GenerateToken(payload);
};

export { addUser, getUsers, loginService, updateUserRole };
