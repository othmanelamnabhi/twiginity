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
const { postTweet, scheduleTweet } = require("./tweets.controller");
const isAuthenticated = require("../../helpers/isAuthenticated");

const tweetsRouter = express.Router();

tweetsRouter.post("/post-tweet", isAuthenticated, postTweet);

tweetsRouter.post("/schedule-tweet", isAuthenticated, scheduleTweet);

module.exports = tweetsRouter;
