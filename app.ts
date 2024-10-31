import express, {Request, Response} from "npm:express@4.18.2";

const app = express();

app.get("/", (_: Request, res: Response) => {
  res.send("Welcome to the Dinosaur API!");
});

app.listen(() => {
    console.log("server started")
});