import mongoose from "mongoose";

// Fuction to connect to mongodb database
export const connectDB = async () => {
  try {
    mongoose.connection.on("connected", () =>
      console.log("Database Connected")
    );
    await mongoose.connect(`${process.env.MONGODB_URI}/
            chat-app`);
  } catch (error) {
    console.log("Error connecting to database", error);
  }
};
