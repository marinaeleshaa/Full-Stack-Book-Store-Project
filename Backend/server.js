import express from "express";
import cors from "cors";
import bookRouter from "./router/BookRouter.js";
import userRouter from "./router/UserRouter.js";
import authRouter from "./router/AuthRouter.js";
import mongoose from "mongoose";
import { LoggerMiddleware } from "./middleWare/logger.js";
import { AuthMiddleware } from "./middleWare/auth.js";
process.loadEnvFile("./.env");

mongoose
  .connect(process.env.DB_URL)
  .then((res) => {
    console.log("connected");
  })
  .catch((err) => console.log(err));

const app = express();
const PORT = 5000;
app.use(cors());
app.use(express.json());
app.use(LoggerMiddleware);

app.use("/api/books", bookRouter);
app.use("/api/users", AuthMiddleware, userRouter);
app.use("/api/auth", authRouter);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
