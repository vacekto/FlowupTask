import { AppDataSource } from "../config/dataSource.ts";
import { User } from "../entities/User.ts";

export const productRepository = AppDataSource.getMongoRepository(User);
