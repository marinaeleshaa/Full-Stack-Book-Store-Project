import e from "express";
import { addUser, loginService } from "../services/UserService.js";

const Router = e.Router();

Router.post("/register", addUser);
Router.post("/login", loginService);

export default Router;
