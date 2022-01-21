const schedule = require("node-schedule");
const { TwitterApi } = require("twitter-api-v2");
const User = require("../models/user.model");

class Tweet {
  constructor(id, tweet, twitterId) {
    this.id = id;
    this.tweet = tweet;
    this.twitterId = twitterId;
  }
}

class ScheduledTweet extends Tweet {
  constructor(id, tweet, twitterId, time) {
    super(id, tweet, twitterId);
    this.time = time;
    this.scheduleTweet(this);
  }

  scheduleTweet(self) {
    // create node-schedule job
    schedule.scheduleJob(self.time, async () => {
      try {
        const { accessToken, accessTokenSecret } = (
          await self.fetchUserTokens(self.twitterId)
        )[0].tokens;

        const twitterClient = new TwitterApi({
          appKey: process.env.API_KEY,
          appSecret: process.env.API_SECRET_KEY,
          accessToken: accessToken,
          accessSecret: accessTokenSecret,
        });

        await twitterClient.v2.tweet(self.tweet);
        console.log(
          `tweet with ID: ${self.id} from user ${self.twitterId} is posted successfully`
        );
      } catch (error) {
        console.log(error);
      }
    });
  }

  async fetchUserTokens(twitterId) {
    return await User.find({ twitterId: twitterId }, "tokens");
  }
}

class PostedTweet extends Tweet {
  constructor(id, tweet, twitterId) {
    super(id, tweet, twitterId);
  }

  async postTweet(self = this) {
    const { accessToken, accessTokenSecret } = (
      await self.fetchUserTokens(self.twitterId)
    )[0].tokens;

    console.log(accessToken, accessTokenSecret);

    const twitterClient = new TwitterApi({
      appKey: process.env.API_KEY,
      appSecret: process.env.API_SECRET_KEY,
      accessToken: accessToken,
      accessSecret: accessTokenSecret,
    });

    return await twitterClient.v2.tweet(self.tweet);
  }

  async fetchUserTokens(twitterId) {
    return await User.find({ twitterId: twitterId }, "tokens");
  }
}

module.exports = { ScheduledTweet, PostedTweet };
