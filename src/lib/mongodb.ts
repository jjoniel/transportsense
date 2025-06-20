import { MongoClient } from "mongodb";

/* eslint-disable no-var */
declare global {
  var _mongoClient: MongoClient | null;
  var _mongoClientPromise: Promise<MongoClient> | null;
}
/* eslint-enable no-var */

async function dbConnect() {
  const MONGODB_URI = process.env.MONGODB_URI!;

  if (!MONGODB_URI) {
    throw new Error(
        "Please define the MONGODB_URI environment variable inside .env.local"
    );
  }

  if (!global._mongoClientPromise) {
    const client = new MongoClient(MONGODB_URI);
    global._mongoClient = client;
    global._mongoClientPromise = client.connect();
  }

  return global._mongoClientPromise;
}

export default dbConnect;