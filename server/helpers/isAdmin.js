function isAdmin(req, res, next) {
  if (req.isAuthenticated() && req.user && req.user.twitterId === "1360576850469224450") {
    next();
  } else {
    return res.status(401).json({
      authenticated: false,
      message: "You're not an admin, get out.",
    });
  }
}

module.exports = isAdmin;
