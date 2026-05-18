import mongoose, { mongo, Mongoose } from "mongoose";

const db_url: string = "dburl"; // fix this  later
type connectionObject = {
  isConnectd?: number;
};

const connection: connectionObject = {};

async function DbConnect(): Promise<void> {
  if (connection.isConnectd) {
    console.log("already connected");
    return;
  }
  try {
    const db = await mongoose.connect(process.env.DB_CONNECTION_URL || db_url);
    console.log("connected successfully");
  } catch (error) {
    console.log("connection failed", error);
  }
}
