const express = require("express");
const {
  deleteRecentTweets,
  uploadTweetJs,
  deleteTweetJs,
} = require("./tweets.controller");
const isAuthenticated = require("../../helpers/isAuthenticated");
const twitterClient = require("../../auth/twitterClient");
const fileUpload = require("express-fileupload");

const tweetsRouter = express.Router();

tweetsRouter.delete(
  "/delete-recent-tweets",
  isAuthenticated,
  twitterClient,
  deleteRecentTweets
);

tweetsRouter.post(
  "/upload-tweet-js",
  [
    isAuthenticated,
    twitterClient,
    fileUpload({
      useTempFiles: true,
      tempFileDir: "../../tmp/",
      parseNested: true,
      createParentPath: true,
      debug: true,
    }),
  ],
  uploadTweetJs
);

tweetsRouter.delete("/delete-tweet-js", isAuthenticated, twitterClient, deleteTweetJs);

module.exports = tweetsRouter;
