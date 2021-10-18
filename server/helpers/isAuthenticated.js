function isAuthenticated(req, res, next) {
  if (req.isAuthenticated() && req.user) {
    next();
  } else {
    return res.redirect("/auth/login");
  }
}

module.exports = isAuthenticated;
