import dotenv from "dotenv";

const { NODE_ENV } = process.env;

// eslint-disable-next-line no-console
console.log("Read envs from config on: ", NODE_ENV);

const path = NODE_ENV === "test" ? ".env.test" : ".env";
const { error, parsed: envs } = dotenv.config({ path });

// eslint-disable-next-line no-console
console.log(envs);

export const {
  SERVER_PORT = 3000,
  MONGO_URI = "mongodb://localhost:27017",
  MONGO_DBNAME = "superheroes",
  API_ENDPOINT = "https://www.superheroapi.com/api.php/3107780482599483",
} = process.env;
