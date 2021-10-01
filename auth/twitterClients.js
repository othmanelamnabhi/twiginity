const Twitter = require("twitter-lite");

function twitterClients(req, res, next) {
  req.v1 = new Twitter({
    consumer_key: process.env.API_KEY,
    consumer_secret: process.env.API_SECRET_KEY,
    access_token_key: req.user.tokens.accessToken, // from your User (oauth_token)
    access_token_secret: req.user.tokens.accessTokenSecret, // from your User (oauth_token_secret)
  });

  req.v2 = new Twitter({
    version: "2", // version "1.1" is the default (change for v2)
    extension: false, // true is the default (this must be set to false for v2 endpoints)
    consumer_key: process.env.API_KEY, // from Twitter.
    consumer_secret: process.env.API_SECRET_KEY, // from Twitter.
    access_token_key: req.user.tokens.accessToken, // from your User (oauth_token)
    access_token_secret: req.user.tokens.accessTokenSecret, // from your User (oauth_token_secret)
  });

  next();
}

module.exports = twitterClients;
