import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI!;
if (!MONGODB_URI) {
  throw new Error('❌ Missing MONGODB_URI in environment variables');
}

// Add a type-safe global cache for development
interface MongooseGlobal {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

// Extend globalThis to include our mongoose cache
declare global {
  var mongoose: MongooseGlobal | undefined;
}

const globalCache = globalThis.mongoose ??= { conn: null, promise: null };

async function dbConnect() {
  if (globalCache.conn) return globalCache.conn;

  if (!globalCache.promise) {
    globalCache.promise = mongoose.connect(MONGODB_URI, {
      dbName: 'iris',
      bufferCommands: false,
    });
  }

  globalCache.conn = await globalCache.promise;
  return globalCache.conn;
}

export default dbConnect;
