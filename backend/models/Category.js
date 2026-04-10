const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  rashi: String,
  name: String,
  place: String,
  email: String,
  number: String
});

module.exports = mongoose.model("Category", categorySchema);