import { Application } from "oak";
import { errorMiddleware } from "./middleware/errorHandler.ts";
import { connectToMongoDB } from "./MongoDB/MongoConfig.ts";
import appRouter from "./routes/appRouter.ts";
import serverConfig from "./serverConfig.ts";
import logger from "./util/logger.ts";

self.addEventListener("error", (err) => {
	logger.critical(err);
});

self.addEventListener("unhandledrejection", (err) => {
	logger.critical(err.reason);
});

const app = new Application();

app.use(errorMiddleware);
app.use(appRouter.routes());

await connectToMongoDB();

app.listen({ port: serverConfig.SERVER_PORT }).catch((err) => {
	logger.critical("Failed to start the server:", err);
	Deno.exit(1);
});

logger.debug(`Server running in mode: ${serverConfig.ENV}`);
