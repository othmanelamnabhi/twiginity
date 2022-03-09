const fs = require("fs");
const { TwitterApi } = require("twitter-api-v2");

// const awaitTimeout = (delay) => new Promise((resolve) => setTimeout(resolve, delay));

const deletionProcess = async (
  { data: { tweetId, tokens, twitterId, numberOfTweets, index, socketId, username } },
  done
) => {
  const twitterClient = new TwitterApi({
    appKey: process.env.API_KEY,
    appSecret: process.env.API_SECRET_KEY,
    accessToken: tokens.accessToken,
    accessSecret: tokens.accessTokenSecret,
  });
  try {
    await twitterClient.v1.deleteTweet(tweetId);
    // await awaitTimeout(1000);
    io.to(socketId).emit("deleting", {
      type: "deleting",
      numberOfTweets,
      increment: 1,
    });

    done(null, index + 1);
  } catch (error) {
    if (error?.code === 404) {
      io.to(socketId).emit("deleting", {
        type: "deleting",
        numberOfTweets,
        increment: 1,
        tweetId,
        deleteError: "notFound",
        error: error.message,
      });
      return done(error);
    }
    io.to(socketId).emit("deleting", {
      type: "deleting",
      numberOfTweets,
      increment: 1,
      tweetId,
      username,
      deleteError: "anotherError",
      error: error.message,
    });

    done(error);
  }
};

module.exports = {
  deletionProcess,
};
