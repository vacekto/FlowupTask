import { ZodError } from "zod";
import CustomServerError from "./CustomServerError.ts";

export default class ValidationError extends CustomServerError {
    constructor(err: ZodError, message?: string) {
        // console.error("some err: ", err);
        // console.error(err.errors);
        // console.error("cosikdosi");
        // console.error(err.issues);
        message = message ?? "Unexpected Zod validation error ";
        super(message, 400);
    }
}
