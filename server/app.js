const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const cookieSession = require("cookie-session");
const passport = require("passport");
const cors = require("cors");

require("./auth/twitter-api-authentication");

const httpToHttpsRedirect = require("./helpers/httptohttpsredirect");
const app = express();
const authRouter = require("./routes/auth/auth.router");
const tweetsRouter = require("./routes/tweets/tweets.router");

app.use(morgan("combined"));

// Secure the app with Helmet
app.use(helmet());

// Middleware to handle HTTP to HTTPS redirects on all requests
app.all("*", httpToHttpsRedirect);

app.use(
  cookieSession({
    maxAge: 60 * 60 * 24 * 1000,
    keys: JSON.parse(process.env.COOKIE_KEYS), // store those in .env file
    name: "session",
  })
);

app.use(passport.initialize());

app.use(passport.session());

app.use(
  cors({
    origin: "https://127.0.0.1:3000", // allow to server to accept request from different origin
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true, // allow session cookie from browser to pass through
  })
);

app.use(express.json());

app.use("/auth", authRouter);
app.use("/tweets", tweetsRouter);

const authCheck = (req, res, next) => {
  if (!req.user) {
    res.status(401).json({
      authenticated: false,
      message: "user has not been authenticated",
    });
  } else {
    next();
  }
};

app.get("/", authCheck, (req, res) => {
  res.status(200).json({
    authenticated: true,
    message: "user successfully authenticated",
  });
});

module.exports = app;
