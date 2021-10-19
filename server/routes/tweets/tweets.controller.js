const twitter = require("twitter-text");
const app = require("../../app");
const { ScheduledTweet, PostedTweet } = require("../../models/tweets.model");
const Job = require("../../models/jobs.model");
const server = require("../../server");
const User = require("../../models/user.model");

async function postTweet(req, res) {
  const id = req.body.id;
  const twitterId = req.user.twitterId;
  const tweet = req.body.tweet;

  const tweetToBePosted = new PostedTweet(id, tweet, twitterId);

  console.log(tweetToBePosted);

  try {
    const postTheTweet = await tweetToBePosted.postTweet();

    return res.status(200).json({ status: "success", data: postTheTweet });
  } catch (error) {
    console.error(error);
    return res.status(400).json({ status: "error", message: error });
  }

  // const tweet = req.body.tweet;
  // const time = req.body.time;
  // const v1 = req.twitterClient.v1;
  // let attachment_url = null; // add url extraction logic later
  // let media_ids = null; // add file upload feature
  // // also add thread posting feature
  // let params =
  //   attachment_url || media_ids ? { attachment_url, media_ids } : null;
  // const isTweetValid = twitter.parseTweet(tweet).valid;

  // try {
  //   if (isTweetValid) {
  //     const tweetToPost = await v1.tweet(tweet, params);
  //     return res.status(200).json(tweetToPost);
  //   } else {
  //     const invalidReason = twitter.isInvalidTweet(tweet);
  //     console.log(invalidReason);
  //     return res.status(400).json({
  //       error: invalidReason,
  //     });
  //   }
  // } catch (error) {
  //   console.error(error);
  //   return res.status(400).json(error);
  // }
}

async function scheduleTweet(req, res) {
  const id = req.body.id;
  const twitterId = req.user.twitterId;
  const tweet = req.body.tweet;
  const time = req.body.time;

  // async function fetchUserTokens(twitterId) {
  //   return await User.find({ twitterId: twitterId }, "tokens");
  // }

  // console.log(await fetchUserTokens(twitterId));

  // const { accessToken, accessTokenSecret } = (
  //   await fetchUserTokens(twitterId)
  // )[0].tokens;

  // res.json({ accessTokenSecret, accessToken });

  try {
    // schedule new job in memory
    server.scheduledTweetsQueue.push(
      new ScheduledTweet(id, tweet, twitterId, time)
    );
    // schedule new job in database
    const newJob = new Job();
    newJob.id = id;
    newJob.twitterId = twitterId;
    newJob.time = time;
    newJob.tweet = tweet;
    await newJob.save();

    const jobList = await Job.find();

    res.json({
      status: "success",
      data: jobList,
    });
  } catch (error) {
    console.log(error);
    res.json({ status: "error", message: error });
  }

  // const tweet = req.body.tweet;
  // const time = new Date(req.body.time);
  // const v1 = req.twitterClient.v1;
  // let attachment_url = null; // add url extraction logic later
  // let media_ids = null; // add file upload feature
  // // also add thread posting feature
  // let params =
  //   attachment_url || media_ids ? { attachment_url, media_ids } : null;

  // schedule.scheduleJob(time, async () => {
  //   try {
  //     const tweetToPost = await v1.tweet(tweet, params);
  //     console.log(schedule.scheduledJobs);
  //     // return res.status(200).json(tweetToPost);
  //   } catch (error) {
  //     console.error(error);
  //     return res.status(400).json(error);
  //   }
  // });

  // return res.status(200).json({
  //   status: "tweet scheduled",
  // });
}

module.exports = {
  postTweet,
  scheduleTweet,
};
