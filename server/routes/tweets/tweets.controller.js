const twitter = require("twitter-text");
const Job = require("../../models/jobs.model");
const server = require("../../server");
const { TwitterApi } = require("twitter-api-v2");

async function deleteTweets(req, res) {
  olderThan = req.body.time;
  const client = req.twitterClient;
  const userId = req.user.twitterId;
  const keyword = req.body.keyword;

  let tweetsToBeDeleted = await client.v2.userTimeline(userId, {
    end_time: olderThan ? olderThan : undefined,
  });

  // fetch all 3200 tweets
  await tweetsToBeDeleted.fetchNext();

  // while (!tweetsToBeDeleted.done) {
  //   await tweetsToBeDeleted.fetchNext();
  // }

  const {
    _realData: { data },
  } = tweetsToBeDeleted;

  if (keyword) {
    tweetsToBeDeleted = data.filter((tweet) => tweet.text.includes(keyword));
  }

  //return res.status(200).json({ status: "success", data });
  return res.status(200).json(tweetsToBeDeleted);
}

async function deleteTweetsFromJson(req, res) {
  // Upload file progressively and update progress bar
  let sampleFile;
  let uploadPath;

  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send("No files were uploaded.");
  }

  // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
  sampleFile = req.files.sampleFile;
  uploadPath = __dirname + sampleFile.name;

  // Use the mv() method to place the file somewhere on your server
  sampleFile.mv(uploadPath, function (err) {
    if (err) return res.status(500).send(err);

    res.send("File uploaded!");
  });
}

module.exports = {
  deleteTweets,
  deleteTweetsFromJson,
};
