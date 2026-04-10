const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  age: Number,
  password: String,
});

module.exports = mongoose.model("User", UserSchema);