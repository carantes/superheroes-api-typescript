import { MongoClient } from "mongodb";

const connect = async (mongodb_uri: string): Promise<MongoClient> => {
  const dbClient = new MongoClient(mongodb_uri, { useUnifiedTopology: true });
  return await dbClient.connect();
};

export default connect;
