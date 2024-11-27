import { MongoClient } from "mongodb";
import serverConfig from "../serverConfig.ts";
import logger from "../util/logger.ts";

export let MongoDBClient: MongoClient;

export const connectToMongoDB = async () => {
    MongoDBClient = new MongoClient(serverConfig.MONGO_URI);
    await MongoDBClient.connect();
    logger.debug("connected to MongoDB successfully");
};
