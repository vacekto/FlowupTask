export const SERVER_PORT = Number(Deno.env.get("SERVER_PORT")) || 3000;
export const ENV = Deno.env.get("ENV");

export const MONGO_HOST = Deno.env.get("MONGO_HOST") || "mongodb";
export const MONGO_PORT = Number(Deno.env.get("MONGO_PORT")) || 27017;
export const MONGO_URI = Deno.env.get("MONGO_URI")!;
export const MONGO_DB_NAME = "flowup_task";
