import { Context } from "oak";

export type oakController = (ctx: Context) => Promise<any> | void;

export type ServerErrorResponse = {
    reason: string;
};
