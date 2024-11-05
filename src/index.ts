import express, { Request, Response } from "express";
import { SERVER_PORT } from "./config.ts";
import { connectToDB } from "./MongoDB/config/connect.ts";

const app = express();

app.get("/", (_: Request, res: Response) => {
	res.send("Welcome to the Dinosaur API!");
});

app.listen(SERVER_PORT, () => {
	console.log("server is live on port: ", SERVER_PORT);
	connectToDB();
});
