const path = require("path");
const fs = require("fs");
const replace = require("stream-replace-string");
const fl = require("firstline");
const { deleteTweetJob, deletionQueue } = require("../../queue/deletion-queue");

function addArrayOfTweetsToJobQueue(
  arrayOfTweets,
  tokens,
  twitterId,
  socketId,
  addToQueueFunction
) {
  for (const [index, tweet] of arrayOfTweets.entries()) {
    const id = tweet?.tweet?.id === undefined ? tweet.id : tweet.tweet.id;

    const jobData = {
      tweetId: id,
      tokens,
      twitterId,
      numberOfTweets: arrayOfTweets.length,
      index,
      socketId,
    };
    addToQueueFunction(jobData);
  }
}

const streamToFile = (inputStream, filePath) => {
  return new Promise((resolve, reject) => {
    const fileWriteStream = fs.createWriteStream(filePath);
    inputStream
      .pipe(replace("window.YTD.tweet.part0 = ", "module.exports = "))
      .pipe(fileWriteStream)
      .on("finish", resolve)
      .on("error", reject);
  });
};

async function deleteRecentTweets(req, res) {
  olderThan = req.body.time;
  const client = req.twitterClient;
  const twitterId = req.user.twitterId;
  const keyword = req.body?.keyword?.toLowerCase();
  const tokens = req.user.tokens;
  const socketId = await redis.hget("user", `${twitterId}`);

  try {
    let tweetsToBeDeleted = await client.v2.userTimeline(twitterId, {
      end_time: olderThan ? olderThan : undefined,
    });

    // fetch all 3200 tweets
    // set maximum number of tweets per request
    await tweetsToBeDeleted.fetchNext();

    // while (!tweetsToBeDeleted.done) {
    //   await tweetsToBeDeleted.fetchNext();
    // }

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
      socketId,
      deleteTweetJob
    );

    return res
      .status(202)
      .json({ type: "processing", tweetCount: tweetsToBeDeleted.length });
  } catch (error) {
    return res.status(500).json({ type: "error", message: error.message });
  }
}

async function uploadTweetJs(req, res) {
  let file;
  let uploadPath;

  file = req.files.tweetjs;
  const newFileName = req.user.twitterId + "-tweet.js";
  uploadPath = path.join(__dirname, "..", "..", "tmp", newFileName);

  file.mv(uploadPath, function (err) {
    if (err) return res.status(500).json({ type: "error", message: err.message });

    res.send(`${newFileName}`);
  });
}

async function deleteTweetJs(req, res, next) {
  const twitterId = req.user.twitterId;
  const socketId = await redis.hget("user", `${twitterId}`);
  const tokens = req.user.tokens;

  const uneditedTweetJs = path.join(
    __dirname,
    "..",
    "..",
    "tmp",
    twitterId + "-tweet.js"
  );

  try {
    if (!fs.existsSync(uneditedTweetJs))
      return res.status(400).send({
        type: "error",
        message: "tweet.js file not found, please upload it again",
      });

    const tweetJsReadStream = fs.createReadStream(
      path.join(__dirname, "..", "..", "tmp", twitterId + "-tweet.js")
    );

    const pathTweetJsWriteStream = path.join(
      __dirname,
      "..",
      "..",
      "tmp",
      twitterId + ".js"
    );

    const FirstLineOfTweetJs = await fl(
      path.join(__dirname, "..", "..", "tmp", twitterId + "-tweet.js")
    );
    if (!FirstLineOfTweetJs.includes("window.YTD.tweet.part0 = "))
      throw new Error(
        "Something is wrong with the file, please check you uploaded the right one."
      );

    await streamToFile(tweetJsReadStream, pathTweetJsWriteStream);

    fs.rm(path.join(__dirname, "..", "..", "tmp", twitterId + "-tweet.js"), (err) => {
      if (err) {
        console.error(err.message);
        return;
      }
      console.log(
        `${new Date().toISOString()} ${twitterId} File deleted successfully \n`
      );

      const logStream = fs.createWriteStream("./log.txt", { flags: "a" });
      logStream.write(
        `${new Date().toISOString()} ${twitterId} File deleted successfully \n`
      );
      logStream.end();
    });

    const tweets = require(`../../tmp/${twitterId}`);

    addArrayOfTweetsToJobQueue(tweets, tokens, twitterId, socketId, deleteTweetJob);
    return res.status(202).json({ type: "processing", tweetCount: tweets.length });
  } catch (error) {
    return res.status(500).json({ type: "error", message: error.message });
  }
}

module.exports = {
  deleteRecentTweets,
  uploadTweetJs,
  deleteTweetJs,
};
