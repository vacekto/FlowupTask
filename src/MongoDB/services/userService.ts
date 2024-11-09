import { User } from "../entities/User.ts";

export const createUser = (user: Omit<User, "id">) => {
    user.email;
};
