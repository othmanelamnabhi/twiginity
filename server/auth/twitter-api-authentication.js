// crypto module
const crypto = require("crypto");
const passport = require("passport");
const { Strategy } = require("passport-twitter");
const User = require("../models/user.model");

const toHexBuffer = (string) => Buffer.from(string, "hex");

const key = process.env.ENCRYPTION_KEY;
console.log(key);
const iv = crypto.randomBytes(16);

const encrypt = (token, key, iv) => {
  const cipher = crypto.createCipheriv("aes-256-cbc", key, toHexBuffer(iv));
  return cipher.update(Buffer.from(token, "utf8"), "utf8", "hex") + cipher.final("hex");
};

const decrypt = (encryptedToken, key, iv) => {
  const decipher = crypto.createDecipheriv("aes-256-cbc", key, toHexBuffer(iv));
  return (
    decipher.update(Buffer.from(encryptedToken, "hex"), "utf8", "utf8") +
    decipher.final("utf8")
  );
};

passport.serializeUser(function (user, done) {
  console.log("serialize", user, user.id);
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  User.findById({ _id: id }, (err, user) => {
    console.log("deserialize", user?.tokens.accessToken);
    console.log("deserialize", user?.tokens.accessTokenSecret);

    if (user) {
      user.tokens.accessToken = decrypt(user?.tokens.accessToken, key, user.iv);
      user.tokens.accessTokenSecret = decrypt(
        user?.tokens.accessTokenSecret,
        key,
        user.iv
      );
    }

    console.log("deserialize", user?.tokens.accessToken);
    console.log("deserialize", user?.tokens.accessTokenSecret);

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
              accessToken: encrypt(token, key, iv),
              accessTokenSecret: encrypt(tokenSecret, key, iv),
            },
            iv,
          }).save();
          console.log("New user created");
          return done(null, newUser);
        }

        if (
          decrypt(user?.tokens.accessToken, key, user.iv) != token ||
          decrypt(user?.tokens.accessTokenSecret, key, user.iv) != tokenSecret
        ) {
          console.log(token);
          console.log(tokenSecret);

          user.tokens.accessToken = encrypt(token, key, user.iv);
          user.tokens.accessTokenSecret = encrypt(tokenSecret, key, user.iv);

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
