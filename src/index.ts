import app from "./app";
import { SERVER_PORT } from "./config";

app.listen(SERVER_PORT);

// eslint-disable-next-line no-console
console.log(`Superhero app is running on port ${SERVER_PORT}`);
