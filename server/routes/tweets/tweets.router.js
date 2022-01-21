// DELETE TWEETS (features)
//  Fetch last 3200 tweets
//  Be mindful of the pagination
//  Store them in an ARRAY
//  Loop through the array and delete each one
// (later) Fetch tweets older than a certain date
// (LATER) Add progress indicator for deletion and maybe for fetching
// (LATER) Delete only tweets containing a certain keyword or phrase

const express = require("express");
const { deleteTweets, deleteTweetsFromJson } = require("./tweets.controller");
const isAuthenticated = require("../../helpers/isAuthenticated");
const twitterClient = require("../../auth/twitterClient");
const fileUpload = require("express-fileupload");

const tweetsRouter = express.Router();

tweetsRouter.delete("/delete-tweets", twitterClient, isAuthenticated, deleteTweets);

tweetsRouter.delete(
  "/delete-tweets-json",
  [twitterClient, isAuthenticated, fileUpload()],
  deleteTweetsFromJson
);

module.exports = tweetsRouter;
