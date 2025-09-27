import express from "express";
import { AuthMiddleware } from "../middleWare/auth.js";
import {
  getBooksControl,
  getBookByIdControl,
  addBookControl,
  updateBookControl,
  deleteBookControl,
} from "../controllers/BookController.js";

const Router = express.Router();

Router.get("/", getBooksControl);
Router.get("/:id", getBookByIdControl);

Router.use(AuthMiddleware);
Router.post("/add", addBookControl);
Router.put("/update/:id", updateBookControl);
Router.delete("/delete/:id", deleteBookControl);

export default Router;
