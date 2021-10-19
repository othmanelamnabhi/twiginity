const { Schema, model } = require("mongoose");

const jobSchema = new Schema({
  id: { type: String },
  twitterId: { type: String },
  time: { type: String },
  tweet: { type: String },
  didJobRun: { type: Boolean, default: false },
});

module.exports = model("Job", jobSchema);
