import CustomServerError from "./errorClasses/CustomError.ts";
import { ServerErrorResponse } from "./types.ts";

export const processCustomServerError = (
    err: CustomServerError,
): ServerErrorResponse => ({
    reason: err.message,
});
