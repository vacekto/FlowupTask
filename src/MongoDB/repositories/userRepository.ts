import { AppDataSource } from "../config/dataSource.ts";
import { User } from "../entities/User.ts";

const userRepository = AppDataSource.getMongoRepository(User);
export default userRepository;
