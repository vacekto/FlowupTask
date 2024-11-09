export default class CustomServerError extends Error {
    constructor(message?: string) {
        super(message);
    }
}
