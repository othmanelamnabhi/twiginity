function isAuthenticated(req, res, next) {
  if (req.isAuthenticated() && req.user) {
    next();
  } else {
    return res.status(401).json({
      error: "You need to login first",
    });
  }
}

module.exports = isAuthenticated;
