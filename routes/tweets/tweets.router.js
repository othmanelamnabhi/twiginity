// POST TWEETS (features)
// (LATER) I can write threads
// (LATER) tweet might contain video or up to 4 photos
// (LATER) if tweet contains tweet permalink, add it as a url_attachment parameter

// DELETE TWEETS (features)
//  Fetch last 3200 tweets
// (LATER)

const express = require("express");
const twitter = require("twitter-text");
const twitterClient = require("../../auth/twitterClient");
const isAuthenticated = require("../../helpers/isAuthenticated");

const tweetsRouter = express.Router();

tweetsRouter.post(
  "/post-tweet",
  isAuthenticated,
  twitterClient,
  async (req, res) => {
    const tweet = req.body.tweet;
    const v1 = req.twitterClient.v1;
    let attachment_url = null; // add url extraction logic later
    let media_ids = null; // add file upload feature
    // also add thread posting feature
    let params =
      attachment_url || media_ids ? { attachment_url, media_ids } : null;
    const isTweetValid = twitter.parseTweet(tweet).valid;

    try {
      if (isTweetValid) {
        const tweetToPost = await v1.tweet(tweet, params);
        return res.status(200).json(tweetToPost);
      } else {
        const invalidReason = twitter.isInvalidTweet(tweet);
        console.log(invalidReason);
        return res.status(400).json({
          error: invalidReason,
        });
      }
    } catch (error) {
      console.error(error);
      return res.status(400).json(error);
    }
  }
);

module.exports = tweetsRouter;
