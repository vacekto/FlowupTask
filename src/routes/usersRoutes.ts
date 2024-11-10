import { Router } from "oak";
const userRouter = new Router();

userRouter.post("/createUser", () => {
    // console.log("creating user");
    // try {
    //     userSchema.parse(req.body);
    // } catch (err) {
    //     throw new ValidationError("cosikdosi", "neco jindyho");
    // }
    // res.send();
});

export default userRouter;
