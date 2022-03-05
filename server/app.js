const express = require("express");
const helmet = require("helmet");
const cookieSession = require("cookie-session");
const passport = require("passport");
const cors = require("cors");
const path = require("path");
// var secure = require("ssl-express-www");

require("./auth/twitter-api-authentication");

const app = express();
const authRouter = require("./routes/auth/auth.router");
const tweetsRouter = require("./routes/tweets/tweets.router");
const jobsRouter = require("./routes/jobs/jobs.router");

// if (process.env.NODE_ENV === "production") {
//   app.use(secure);
// }

// Secure the app with Helmet
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        ...helmet.contentSecurityPolicy.getDefaultDirectives(),
        "img-src": ["'self'", "pbs.twimg.com", "https: data:"],
        "script-src": [
          "'self'",
          "'unsafe-inline'",
          "cdnjs.cloudflare.com",
          "cdn.jsdelivr.net",
        ],
        "worker-src": ["'self'", "blob:"],
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
app.use("/jobs", jobsRouter);

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

module.exports = app;
