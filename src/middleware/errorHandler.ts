import { type Middleware } from 'oak';
import serverConfig from '../serverConfig.ts';
import logger from '../util/logger.ts';

export const errorMiddleware: Middleware = async (ctx, next) => {
    try {
        await next();
    } catch (error) {
        const logObj = {
            msg: '',
            url: ctx.request.url,
            error,
        };

        logger.error(logObj);

        if (serverConfig.ENV === 'production') {
            ctx.response.status = 500;
            ctx.response.body = { error: 'Internal Server Error' };
            // next();
            return;
        }

        ctx.response.body = logObj;
    }
};
