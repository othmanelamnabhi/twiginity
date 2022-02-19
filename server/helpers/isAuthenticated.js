function isAuthenticated(req, res, next) {
  if (req.isAuthenticated() && req.user) {
    next();
  } else {
    return res.status(401).json({
      authenticated: false,
      message: "user has not been authenticated",
    });
  }
}

module.exports = isAuthenticated;
