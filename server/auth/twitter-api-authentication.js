const passport = require("passport");

const { Strategy } = require("passport-twitter");
const User = require("../models/user.model");

passport.serializeUser(function (user, done) {
  console.log("serialize", user, user.id);
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  User.findById({ _id: id }, (err, user) => {
    console.log("deserialize", user, id);
    if (err) return done(err);
    done(null, user);
  });
});

passport.use(
  new Strategy(
    {
      consumerKey: process.env.API_KEY,
      consumerSecret: process.env.API_SECRET_KEY,
      callbackURL: "/auth/twitter/redirect",
    },
    function (token, tokenSecret, profile, done) {
      User.findOne({ twitterId: profile.id }, async function (err, user) {
        console.log("We're in the strategy");
        if (err) return done(err);

        const fullSizeProPic = profile.photos[0].value.replace("_normal", "");
        if (!user) {
          const newUser = await new User({
            twitterId: profile.id,
            username: profile.username,
            displayName: profile.displayName,
            profilePicture: fullSizeProPic,
            tokens: {
              accessToken: token,
              accessTokenSecret: tokenSecret,
            },
          }).save();
          console.log("New user created");
          return done(null, newUser);
        }

        if (
          user.tokens.accessToken != token ||
          user.tokens.accessTokenSecret != tokenSecret
        ) {
          console.log(token);
          console.log(tokenSecret);

          user.tokens.accessToken = token;
          user.tokens.accessTokenSecret = tokenSecret;

          await user.save();

          console.log("Tokens updated");
        }
        user.profilePicture = fullSizeProPic;
        await user.save();
        console.log("User already exists");
        done(null, user);
      });
    }
  )
);
