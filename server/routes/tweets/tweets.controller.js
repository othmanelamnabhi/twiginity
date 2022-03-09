const path = require("path");
const fs = require("fs");
const lineReplace = require("line-replace");
const fl = require("firstline");
const { deleteTweetJob, deletionQueue } = require("../../queue/deletion-queue");
redis = require("../../helpers/redisConnection");

function addArrayOfTweetsToJobQueue(
  arrayOfTweets,
  tokens,
  twitterId,
  username,
  socketId,
  addToQueueFunction
) {
  for (const [index, tweet] of arrayOfTweets.entries()) {
    const id = tweet?.tweet?.id === undefined ? tweet.id : tweet.tweet.id;

    const jobData = {
      tweetId: id,
      tokens,
      twitterId,
      username,
      numberOfTweets: arrayOfTweets.length,
      index,
      socketId,
    };
    addToQueueFunction(jobData);
  }
}

const replaceFirstLine = (file, replacementString) => {
  return new Promise((resolve, reject) => {
    lineReplace({
      file,
      line: 1,
      text: replacementString,
      addNewLine: true,
      callback: ({ file, line, text, replacedText, error }) => {
        if (error) return reject(error);
        resolve(replacedText);
      },
    });
  });
};

function deleteFile(fileToBeDeleted) {
  fs.rm(fileToBeDeleted, (err) => {
    if (err) {
      console.error(err.message);
      return;
    }
    console.log(`${new Date().toISOString()} File deleted successfully`);
  });
}

async function deleteRecentTweets(req, res) {
  olderThan = req.body.time;
  const client = req.twitterClient;
  const twitterId = req.user.twitterId;
  const username = req.user.username;
  const keyword = req.body?.keyword?.toLowerCase();
  const tokens = req.user.tokens;
  const socketId = await redis.HGET("user", `${twitterId}`);

  try {
    let tweetsToBeDeleted = await client.v2.userTimeline(twitterId, {
      end_time: olderThan ? olderThan : undefined,
      max_results: 100,
    });

    while (!tweetsToBeDeleted.done) {
      await tweetsToBeDeleted.fetchNext();
    }

    const {
      _realData: { data },
    } = tweetsToBeDeleted;

    if (keyword) {
      tweetsToBeDeleted = data.filter((tweet) =>
        tweet.text.toLowerCase().includes(keyword)
      );
    } else {
      tweetsToBeDeleted = data;
    }

    if (tweetsToBeDeleted.length === 0) {
      return res.status(200).json({ type: "no results" });
    }

    addArrayOfTweetsToJobQueue(
      tweetsToBeDeleted,
      tokens,
      twitterId,
      username,
      socketId,
      deleteTweetJob
    );

    const { waiting: queuedTweets } = await deletionQueue.checkHealth();

    return res.status(202).json({
      type: "processing",
      tweetCount: tweetsToBeDeleted.length,
      queuedTweets: queuedTweets > 0 ? queuedTweets : null,
    });
  } catch (error) {
    return res.status(error.code ?? 500).json({ type: "error", message: error.message });
  }
}

async function uploadTweetJs(req, res) {
  let file;
  let uploadPath;
  const client = req.twitterClient;

  try {
    // test if tokens are still valid
    await client.v2.me({ expansions: ["pinned_tweet_id"] });

    file = req.files.tweetjs;
    const newFileName = req.user.twitterId + "-tweet.js";
    uploadPath = path.join(__dirname, "..", "..", "tmp", newFileName);

    file.mv(uploadPath, function (err) {
      if (err) return res.status(500).json({ type: "error", message: err.message });

      res.send(`${newFileName}`);
    });
  } catch (error) {
    return res.status(error.code ?? 500).json({ type: "error", message: error.message });
  }
}

async function deleteTweetJs(req, res, next) {
  const client = req.twitterClient;
  const username = req.user.username;
  const twitterId = req.user.twitterId;
  const socketId = await redis.HGET("user", `${twitterId}`);
  const tokens = req.user.tokens;

  const tweetJsFile = path.join(__dirname, "..", "..", "tmp", twitterId + "-tweet.js");

  try {
    // test if tokens are still valid
    await client.v2.me({ expansions: ["pinned_tweet_id"] });

    if (!fs.existsSync(tweetJsFile))
      return res.status(400).send({
        type: "error",
        message: "tweet.js file not found, please upload it again",
      });

    const FirstLineOfTweetJs = await fl(tweetJsFile);

    if (!FirstLineOfTweetJs.includes("window.YTD.tweet.part0 = "))
      throw new Error(
        "Something is wrong with the file, please check you uploaded the right one."
      );

    await replaceFirstLine(tweetJsFile, "module.exports = [");

    const tweets = require(`../../tmp/${twitterId}-tweet`);

    addArrayOfTweetsToJobQueue(
      tweets,
      tokens,
      twitterId,
      username,
      socketId,
      deleteTweetJob
    );
    deleteFile(tweetJsFile);

    return res.status(202).json({ type: "processing", tweetCount: tweets.length });
  } catch (error) {
    console.log(error);
    return res.status(error.code ?? 500).json({ type: "error", message: error.message });
  }
}

module.exports = {
  deleteRecentTweets,
  uploadTweetJs,
  deleteTweetJs,
};
