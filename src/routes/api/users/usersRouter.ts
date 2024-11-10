import { Router } from "oak";
import { createUser } from "../../../controllers/usersControllers.ts";

const usersRouter = new Router();

usersRouter.post("/createUser", createUser);

export default usersRouter;
