const express = require("express");
const authRouter = express.Router();
const passport = require("passport");

authRouter.get("/twitter", passport.authenticate("twitter"));

authRouter.get("/logout", (req, res) => {
  const session = req.query.session;
  const isExpired = session === "expired";
  req.logout();
  isExpired ? res.redirect(`/?session=expired`) : res.redirect(`/`);
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
    successRedirect: "/delete-recent",
    failureRedirect: "/",
  })
);

module.exports = authRouter;
