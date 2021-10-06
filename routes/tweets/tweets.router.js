// POST TWEETS (features)
// (LATER) I can write threads
// (LATER) tweet might contain video or up to 4 photos
// (LATER) if tweet contains tweet permalink, add it as a url_attachment parameter

// DELETE TWEETS (features)
//  Fetch last 3200 tweets
//  Be mindful of the pagination
//  Store them in an ARRAY
//  Loop through the array and delete each one
// (later) Fetch tweets older than a certain date
// (LATER) Add progress indicator for deletion and maybe for fetching
// (LATER) Delete only tweets containing a certain keyword or phrase

// (LATER) Tweets scheduling feature
//  Post tweet route is gonna take in another argument that is DATE and TIME
//  If DATE argument is NOT NULL then schedule tweet

// DRAFTS SECTIONS (schedule tweets) (if can store and fetch drafts from twitter)

// HISTORY SECTION

// MENTIONS SECTION

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
