import e from "express";
import { getUsers } from "../services/UserService.js";
const Router = e.Router();


Router.get("/", getUsers);
// Router.get("/", getUser);
// Router.patch("/:id/role", updateUserRole);
// Router.delete("/:id", deleteUser);

export default Router;
