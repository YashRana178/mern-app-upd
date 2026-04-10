const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb+srv://yashrana313_db_user:pOg1vHHxsgoc8TGG@cluster0.khkvq3i.mongodb.net/?appName=Cluster0");
    console.log("MongoDB Connected");
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

module.exports = connectDB;