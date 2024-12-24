import { MongoClient } from 'mongodb';
import serverConfig from '../../serverConfig.ts';
import logger from '../../util/logger.ts';

export const mongoClient = new MongoClient(serverConfig.MONGO_URI);

export const DB = mongoClient.db(serverConfig.MONGO_DB_NAME);

export const connectToMongoDB = () => {
    mongoClient.connect();
    logger.debug('connected to MongoDB successfully');
};
