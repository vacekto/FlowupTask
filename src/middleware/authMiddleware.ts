import { verify } from 'djwt';
import { Middleware } from 'oak';
import config from '../serverConfig.ts';

export const authUser: Middleware = async (ctx, next) => {
    const test = await ctx.request.body.json();
    const token = ctx.request.headers.get('token');
    if (!token) throw new Error('no auth token provided');
    const { email, id, username } = await verify(token, config.JWT_SECRET);
    ctx.state.email = email;
    ctx.state.id = id;
    ctx.state.username = username;
    next();
};
