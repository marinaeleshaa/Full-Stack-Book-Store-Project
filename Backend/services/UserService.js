import { GenerateToken } from "../jwt/jwtUtil.js";
import {
  AddUser,
  GetAllUsers,
  GetUserByUn,
} from "../repository/UserRepository.js";
import bcrypt from "bcryptjs";

const getUsers = async (req, res) => {
  const users = await GetAllUsers();
  res.status(200).json(users);
};

const addUser = async (req, res) => {
  const body = req.body;
  const { password } = body;
  const hashedPassword = await bcrypt.hash(password, 12);
  const user = await AddUser({ ...body, password: hashedPassword });
  res.status(200).json({
    id: user._id,
    username: user.username,
    name: user.name,
    role: user.role,
  });
};

const loginService = async (req, res) => {
  const { username, password } = req.body;
  const user = await GetUserByUn(username);
  const isSuccess = await bcrypt.compare(password, user.password);
  if (!isSuccess) {
    return res.status(401).json({ error: "username or password invalid" });
  }
  const payload = { username: user.username, role: user.role, id: user._id };
  return res.json({ jwt: GenerateToken(payload) });
};

export { addUser, getUsers, loginService };
