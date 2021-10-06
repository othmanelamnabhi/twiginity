const { TwitterApi } = require("twitter-api-v2");

function twitterClient(req, res, next) {
  req.twitterClient = new TwitterApi({
    appKey: process.env.API_KEY,
    appSecret: process.env.API_SECRET_KEY,
    accessToken: req.user.tokens.accessToken,
    accessSecret: req.user.tokens.accessTokenSecret,
  });

  next();
}

module.exports = twitterClient;
