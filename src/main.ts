import { Application } from "oak";
import { connectToDB } from "./MongoDB/config/connect.ts";
import appRouter from "./routes/appRouter.ts";
import { SERVER_PORT } from "./serverConfig.ts";

const oakApp = new Application();
oakApp.use(appRouter.routes());

// app.use(errorMiddleware);
try {
	await connectToDB();
	oakApp.listen({ port: SERVER_PORT });
} catch (err) {
	console.error("Failed to start the server:", err);
	Deno.exit(1);
}
