const fs = require("fs");

// import twitterClient for deletion

const deletionProcess = async ({
  data: { tweetId, tokens, twitterId, numberOfTweets, index, socketId },
}) => {
  try {
    // add tweet delete function
    io.to(socketId).emit("deleting", {
      type: "deleting",
      progress: Math.round(((index + 1) / numberOfTweets) * 100),
      tweetNumber: index + 1,
    });
  } catch (error) {
    io.to(socketId).emit("deleting", {
      type: "deleting",
      progress: Math.round(((index + 1) / numberOfTweets) * 100),
      tweetNumber: index + 1,
      deleteError: `tweet ${tweetId} failed to delete`,
      error: error.message,
    });
  }
};

module.exports = {
  deletionProcess,
};
