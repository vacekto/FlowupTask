import { ErrorRequestHandler } from "express-types";
import CustomServerError from "../util/errorClasses/CustomServerError.ts";
import { processCustomServerError } from "../util/functions.ts";

export const errorMiddleware: ErrorRequestHandler = (err, req, res, next) => {
    if (!(err instanceof CustomServerError)) {
        next(err);
        return;
    }
    res.status(err.statusCode).send(processCustomServerError(err));
};
