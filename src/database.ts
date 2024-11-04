import { DataSource } from "typeorm";
import { MONGO_HOST, MONGO_PORT } from "./config.ts";

const AppDataSource = new DataSource({
    type: "mongodb",
    host: MONGO_HOST,
    port: MONGO_PORT,
    database: "time_tracker",
    synchronize: true,
    logging: true,
    entities: [],
});

export const connectToDB = async () => {
    try {
        await AppDataSource.initialize();
        console.log("connected to DB successfully");
    } catch (err) {
        console.error(err);
    }
};
