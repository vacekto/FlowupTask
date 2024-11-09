import CustomServerError from "./CustomServerError.ts";

export default class ValidationError extends CustomServerError {
    constructor(typeExpected: string, typeGiven: string) {
        const message =
            `Invalid data type, exptected: ${typeExpected} but received: ${typeGiven}`;
        super(message, 400);
    }
}
