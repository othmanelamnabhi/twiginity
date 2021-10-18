const twitter = require("twitter-text");

async function postTweet(req, res) {
  const tweet = req.body.tweet;
  const time = req.body.time;
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

async function scheduleTweet(req, res) {
  const tweet = req.body.tweet;
  const time = req.body.time;
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

module.exports = {
  postTweet,
  scheduleTweet,
};
