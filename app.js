const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const cookieSession = require("cookie-session");
const passport = require("passport");
require("./auth/twitter-api-authentication");

const httpToHttpsRedirect = require("./helpers/httptohttpsredirect");
const app = express();
const authRouter = require("./routes/auth/auth.router");

app.use(morgan("combined"));

// Secure the app with Helmet
app.use(helmet());
app.all("*", httpToHttpsRedirect);

app.use(
  cookieSession({
    maxAge: 60 * 60 * 24 * 1000,
    keys: ["code1", "code2"],
    name: "session",
  })
);

app.use(express.static("public"));
app.use(passport.initialize());

app.use(passport.session());

// Middleware to handle HTTP to HTTPS redirects on all requests

app.use(express.json());
app.use("/auth", authRouter);

module.exports = app;
