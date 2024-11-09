export default class CustomServerError extends Error {
    statusCode: number;

    constructor(message?: string, statusCode?: number) {
        super(message);
        this.statusCode = statusCode ?? 500;
    }
}
