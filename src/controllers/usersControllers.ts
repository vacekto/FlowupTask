import { oakController } from "../util/types.ts";
import { userSchema } from "../util/zodSchemas.ts";

export const createUser: oakController = (ctx) => {
    const user = ctx.request.body;
    const cosikdosi = userSchema.safeParse(user);
    // cosikdosi.
};
