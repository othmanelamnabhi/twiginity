const mongoose = require("mongoose");

const MONGODB_URL = process.env.MONGODB_URL;

async function connectToDatabase() {
  await mongoose.connect(MONGODB_URL);
}

mongoose.connection.once("open", () => {
  console.log("Connected to database");
});

module.exports = connectToDatabase;
