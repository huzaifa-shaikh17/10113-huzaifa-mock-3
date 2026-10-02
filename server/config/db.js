import mongoose from "mongoose";

const db = async () => {
  try {
    await mongoose.connect(process.env.MONGOOSE_URL);
    console.log("database connected...");
  } catch (error) {
    console.log(error.message);
  }
};

export default db;
