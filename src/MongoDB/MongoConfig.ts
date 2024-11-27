import { MongoClient } from "mongodb";
import { MONGO_URI } from "../constants.ts";
import logger from "../util/logger.ts";

export let MongoDBClient: MongoClient;

export const connectToMongoDB = async () => {
    MongoDBClient = new MongoClient(MONGO_URI);
    await MongoDBClient.connect();
    logger.debug("connected to MongoDB successfully");
};
