const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const cookieSession = require("cookie-session");
const passport = require("passport");
const cors = require("cors");
const path = require("path");
var secure = require("ssl-express-www");

require("./auth/twitter-api-authentication");

const app = express();
const authRouter = require("./routes/auth/auth.router");
const tweetsRouter = require("./routes/tweets/tweets.router");

app.use(morgan("combined"));

if (process.env.NODE_ENV === "production") {
  app.use(secure);
}

// Secure the app with Helmet
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        ...helmet.contentSecurityPolicy.getDefaultDirectives(),
        "img-src": ["'self'", "pbs.twimg.com", "https: data:"],
      },
    },
  })
);

app.use(
  cookieSession({
    maxAge: 60 * 60 * 24 * 1000,
    keys: JSON.parse(process.env.COOKIE_KEYS),
    name: "session",
  })
);

app.use(passport.initialize());

app.use(passport.session());

app.use(cors());

const publicPath = path.join(__dirname, "build");
app.use(express.static(publicPath));

app.use(express.json());

app.use("/auth", authRouter);
app.use("/tweets", tweetsRouter);

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

// const authCheck = (req, res, next) => {
//   if (!req.user) {
//     res.status(401).json({
//       authenticated: false,
//       message: "user has not been authenticated",
//     });
//   } else {
//     next();
//   }
// };

// app.get("/", authCheck, (req, res) => {
//   res.status(200).json({
//     authenticated: true,
//     message: "user successfully authenticated",
//   });
// });

module.exports = app;
