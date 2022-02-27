const fs = require("fs");

// import twitterClient for deletion
// simulate error
// check if already deleted
// if tweet exists, render link to tweet

const awaitTimeout = (delay) => new Promise((resolve) => setTimeout(resolve, delay));

const deletionProcess = async (
  { data: { tweetId, tokens, twitterId, numberOfTweets, index, socketId } },
  done
) => {
  await awaitTimeout(1000);
  try {
    console.log(index + 1);
    throw new Error("hola");
    io.to(socketId).emit("deleting", {
      type: "deleting",
      progress: Math.round(((index + 1) / numberOfTweets) * 100),
      tweetNumber: index + 1,
    });

    done(null, index + 1);
  } catch (error) {
    io.to(socketId).emit("deleting", {
      type: "deleting",
      progress: Math.round(((index + 1) / numberOfTweets) * 100),
      tweetNumber: index + 1,
      deleteError: `Tweet ID -> ${tweetId} could not be deleted.`,
      error: error.message,
    });

    done(error);
  }
};

module.exports = {
  deletionProcess,
};
