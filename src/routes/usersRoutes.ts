import { Request, Response, Router } from "express";
import { ValidationError } from "../util/errorClasses/index.ts";
import { userSchema } from "../util/zodSchemas.ts";
const userRouter = Router();

userRouter.post("/createUser", (req: Request, res: Response) => {
    console.log("creating user");
    try {
        userSchema.parse(req.body);
    } catch (err) {
        throw new ValidationError("cosikdosi", "neco jindyho");
    }
    res.send();
});

export default userRouter;
