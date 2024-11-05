import { AppDataSource } from "./dataSource.ts";

export const connectToDB = async () => {
    try {
        await AppDataSource.initialize();
        console.log("connected to DB successfully");
    } catch (err) {
        console.log("database connection error: ", err);
    }
};
