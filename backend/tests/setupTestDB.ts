import mongoose from "mongoose";

export const connectTestDB = async () => {
  const uri = "mongodb://127.0.0.1:27017/library_test_db";
  await mongoose.connect(uri);
};

export const disconnectTestDB = async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.disconnect();
};
