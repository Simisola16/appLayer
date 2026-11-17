import { Db, MongoClient } from "mongodb";

declare global {
  // eslint-disable-next-line no-var
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

const DEFAULT_DB_NAME = "applayer";

/**
 * Returns a cached MongoDB database instance using MONGODB_URI.
 * Returns null if MONGODB_URI is not configured in the environment.
 */
export async function getDatabase(): Promise<Db | null> {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    return null;
  }

  if (!global._mongoClientPromise) {
    const client = new MongoClient(uri);
    global._mongoClientPromise = client.connect().catch((error) => {
      global._mongoClientPromise = undefined;
      throw error;
    });
  }

  const client = await global._mongoClientPromise;
  const dbName = process.env.MONGODB_DB_NAME || DEFAULT_DB_NAME;
  return client.db(dbName);
}
