const mongoose = require("mongoose");
const dataSchema = require("../models/ownershipModel");

require("dotenv").config();
const uri = process.env.URI;

function createConnection() {
  try {
    mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected successfully");
    mongoose.model("authorization", dataSchema);
  } catch (err) {
    console.log("Error connecting to database", err);
  }
}
module.exports = createConnection;
