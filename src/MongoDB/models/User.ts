import serverConfig from "../../serverConfig.ts";
import { MongoDBClient } from "../MongoConfig.ts";

const USER_COLLECTION_NAME = "cosikdosi";

const db = MongoDBClient.db(serverConfig.MONGO_DB_NAME);
const users = db.collection(USER_COLLECTION_NAME);

class User {
    email: string;
    name: string;
    constructor({ email, name }: { email: string; name: string }) {
        this.email = email;
        this.name = name;
    }
}
