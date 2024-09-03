import mongoose from "mongoose";

const connectDB = async function () {
  try {
    let connect = await mongoose.connect("mongodb://127.0.0.1:27017/chat-app");

    if (!connect) {
      throw new Error("connection failed to Database");
    }
    console.log("connection established to Database");
  } catch (error) {}
};

connectDB();
