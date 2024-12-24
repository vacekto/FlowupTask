import { Application } from 'oak';
import { errorMiddleware } from './middleware/errorHandler.ts';
import { connectToMongoDB } from './MongoDB/config/index.ts';
import appRouter from './routes/appRouter.ts';
import serverConfig from './serverConfig.ts';
import logger from './util/logger.ts';

self.addEventListener('error', (err) => {
	logger.critical(err);
});

self.addEventListener('unhandledrejection', (err) => {
	logger.critical(err.reason);
});

const app = new Application();

app.use(errorMiddleware);
app.use(appRouter.routes());

await connectToMongoDB();

app.listen({ port: serverConfig.SERVER_PORT }).catch((err) => {
	logger.critical('Failed to start the server:', err);
	Deno.exit(1);
});

logger.info(
	`Server running in mode ${serverConfig.ENV} on port ${serverConfig.SERVER_PORT}`,
);
