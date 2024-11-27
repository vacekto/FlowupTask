import { Context } from 'oak';

export type TOakMiddleware = (
    ctx: Context,
    next: () => Promise<unknown>,
) => Promise<any> | void;

export type ServerErrorResponse = {
    message: string;
    callStack: string;
    url: string;
    errorInfo: string;
};
