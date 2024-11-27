// import { processCustomServerError } from "../util/functions.ts";

import CustomServerError from "../util/errorClasses/CustomError.ts";
import { TOakMiddleware } from "../util/types/index.ts";

export const errorMiddleware: TOakMiddleware = async (ctx, next) => {
    try {
        await next();
    } catch (err) {
        // if (Deno.env.get("ENV") === "production") {
        ctx.response.status = 500;
        ctx.response.body = { error: "Internal Server Error" };
        // log error
        // return;
        // }

        if (!(err instanceof CustomServerError)) {
            next();
        }

        // console.log("error chycen");
        // res.status(err.statusCode).send(processCustomServerError(err));
    }
};
