import * as userService from "../services/UserService.js";

export const getUsersControl = async (req, res) => {
  try {
    const users = await userService.getUsers();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateUserRoleControl = async (req, res) => {
  try {
    const { _id } = req.params;
    const { role } = req.body;
    if (!role) {
      return res.status(400).json({ error: "Role is required" });
    }

    const user = await userService.updateUserRole(_id,role);
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const addUserControl = async (req, res) => {
  try {
    const user = await userService.addUser(req.body);
    res.status(201).json(user);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
};

export const loginControl = async (req, res) => {
  try {
    const token = await userService.loginService(req.body);
    res.status(200).json({ jwt: `bearer ${token}` });
  } catch (err) {
    res.status(401).json({ error: err.message });
  }
};
