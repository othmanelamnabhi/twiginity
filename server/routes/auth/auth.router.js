const express = require("express");
const authRouter = express.Router();
const passport = require("passport");

authRouter.get("/twitter", passport.authenticate("twitter"));

authRouter.get("/logout", (req, res) => {
  req.logout();
  // res.redirect("https://127.0.0.1:3000");
});

authRouter.get("/login/success", (req, res) => {
  if (req.user) {
    res.json({
      success: true,
      message: "user has successfully authenticated",
      user: req.user,
    });
  } else {
    res.redirect("/auth/login/failed");
  }
});

authRouter.get("/login/failed", (req, res) => {
  res.status(401).json({
    success: false,
    message: "user failed to authenticate.",
  });
});

authRouter.get(
  "/twitter/redirect",
  passport.authenticate("twitter", {
    successRedirect: "https://127.0.0.1:3000/delete-recent",
    failureRedirect: "https://127.0.0.1:3000",
  })
);

module.exports = authRouter;
