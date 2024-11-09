import express from "express";
import userRouter from "./usersRoutes.ts";

const appRouter = express.Router();

appRouter.use("/api/users", userRouter);

export default appRouter;
