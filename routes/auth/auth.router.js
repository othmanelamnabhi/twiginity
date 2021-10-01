const express = require("express");
const path = require("path");
const authRouter = express.Router();
const passport = require("passport");
const isAuthenticated = require("../../helpers/isAuthenticated");
const twitterClients = require("../../auth/twitterClients");

authRouter.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "..", "public", "login.html"));
});

authRouter.get("/twitter", passport.authenticate("twitter"));

authRouter.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});

authRouter.get(
  "/callback",
  passport.authenticate("twitter", {
    failureRedirect: "/auth/login",
    successRedirect: "/",
  })
);

authRouter.get("/secret", isAuthenticated, (req, res) => {
  res.send("HERE IS THE SECRET");
});

authRouter.get(
  "/anothersecret",
  passport.authenticate("twitter"),
  (req, res) => {
    res.send("HERE IS ANOTHER SECRET");
  }
);

authRouter.get("/sendtweet", twitterClients, async (req, res) => {
  try {
    console.log(req.user.tokens);
    await req.v1.post("statuses/update", { status: "success" });
    console.log("hey");
    res.send("HEY");
  } catch (error) {
    console.error(error);
  }
});

module.exports = authRouter;
