const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  twitterId: { type: String },
  username: { type: String },
  displayName: { type: String },
  profilePicture: { type: String },
  tokens: {
    accessToken: { type: String },
    accessTokenSecret: { type: String },
  },
});

module.exports = model("User", userSchema);
