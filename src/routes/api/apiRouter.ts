import { Router } from "oak";
import usersRouter from "./users/usersRouter.ts";

const apiRouter = new Router();
apiRouter.use("/users", usersRouter.routes());

export default apiRouter;
