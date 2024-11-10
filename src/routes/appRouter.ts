import { Router } from "oak";
import apiRouter from "./api/apiRouter.ts";

const appRouter = new Router();
appRouter.use("/api", apiRouter.routes());

export default appRouter;
