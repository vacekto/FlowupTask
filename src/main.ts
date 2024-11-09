// @deno-types="npm:@types/express@^5.0.0"
import express from "express";
import { errorMiddleware } from "./middleware/errorHandler.ts";
import { connectToDB } from "./MongoDB/config/connect.ts";
import appRouter from "./routes/index.ts";
import { SERVER_PORT } from "./serverConfig.ts";

const app = express();

app.use(appRouter);
app.use(errorMiddleware);

app.get("/", (_, res) => {
	res.send("Welcome to the Dinosaur API!");
});

app.listen(SERVER_PORT, () => {
	console.log("server is live on port: ", SERVER_PORT);
	connectToDB();
});
