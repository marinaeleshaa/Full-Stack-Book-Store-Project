import e from "express";
// import { addUser, loginService } from "../services/UserService.js";
import { addUserControl, loginControl } from "../controllers/UserController.js";

const Router = e.Router();

Router.post("/signup", addUserControl);
Router.post("/login", loginControl);

export default Router;
