const mongoose = require("mongoose");

const MONGODB_URL = `mongodb+srv://tbe-admin:${process.env.MONGODB_PASSWORD}@twitter-brand-enhancer.fdmsb.mongodb.net/twitterBrandEnhancer?retryWrites=true&w=majority`;

async function connectToDatabase() {
  await mongoose.connect(MONGODB_URL);
}

mongoose.connection.once("open", () => {
  console.log("Connected to database");
});

module.exports = connectToDatabase;
