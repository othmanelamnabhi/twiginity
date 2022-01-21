const express = require("express");
const path = require("path");
const authRouter = express.Router();
const passport = require("passport");

authRouter.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "..", "public", "login.html"));
});

authRouter.get("/twitter-login", passport.authenticate("twitter"));

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

module.exports = authRouter;
