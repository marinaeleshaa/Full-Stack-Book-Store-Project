import e from "express";
import { getUsersControl ,updateUserRoleControl} from "../controllers/UserController.js";

const Router = e.Router();


Router.get("/", getUsersControl);
// Router.get("/", getUser);
Router.patch("/:_id/role", updateUserRoleControl);
// Router.delete("/:id", deleteUser);

export default Router;
