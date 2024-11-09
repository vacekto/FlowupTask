export const SERVER_PORT = Deno.env.get("SERVER_PORT") || 3000;

export const MONGO_HOST = Deno.env.get("MONGO_HOST") || "mongodb";
export const MONGO_PORT = Number(Deno.env.get("MONGO_PORT")) || 27017;
