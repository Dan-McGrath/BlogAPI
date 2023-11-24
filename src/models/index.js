import mongoose from "mongoose";

import User from "./user";
import Post from "./post";

const connectDb = () => {
  return mongoose.connect(process.env.DB_URL);
};

const models = { User, Post };

export { connectDb };

export default models;
