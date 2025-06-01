import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI!;
const client = new MongoClient(uri);

export const connectToDatabase = async () => {
  if (!client) throw new Error('No MongoDB client available');
  await client.connect();
  return client.db('irisart');
};
