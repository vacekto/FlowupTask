import ValidationError from "../util/errorClasses/ValidationError.ts";
import { TOakMiddleware } from "../util/types/index.ts";
import { userSchema } from "../util/zodSchemas/index.ts";

export const createUser: TOakMiddleware = (ctx, _) => {
    console.log("cosikdosi route hit");
    const user = ctx.request.body;
    const parsed = userSchema.safeParse(user);
    if (!parsed.success) throw new ValidationError(parsed.error);
    console.log("cosikdosi");
    ctx;
    // new ValidationError(parsed.error);
    // parsed.error;
    // cosikdosi.
};
