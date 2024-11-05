import { DataSource } from "typeorm";
import { MONGO_HOST, MONGO_PORT } from "../../config.ts";
import { User } from "../entities/User.ts";

export const AppDataSource = new DataSource({
    type: "mongodb",
    host: MONGO_HOST,
    port: MONGO_PORT,
    database: "time_tracker",
    synchronize: true,
    logging: true,
    entities: [User],
});
