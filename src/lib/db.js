import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error("MONGODB_URI is missing");
}

const globalForMongoose = global;

globalForMongoose.mongoose ??= {
  conn: null,
  promise: null,
};

export async function dbConnect() {
  const cached = globalForMongoose.mongoose;

  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    mongoose.set("strictQuery", true);

    cached.promise = mongoose.connect(
      MONGODB_URI,
      {
        bufferCommands: false,
        autoIndex:
          process.env.NODE_ENV ===
          "development",
      }
    );
  }

  cached.conn =
    await cached.promise;

  return cached.conn;
}