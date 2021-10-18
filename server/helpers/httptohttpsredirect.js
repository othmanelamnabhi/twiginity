const { HTTPS_PORT } = require("./serverConfig");

function httpToHttpsRedirect(req, res, next) {
  if (process.env.NODE_ENV !== "production") {
    // console.log(
    //   "req start: ",
    //   req.secure,
    //   req.hostname,
    //   req.url,
    //   req.socket.address().port
    // );
  }

  if (req.secure) {
    return next();
  }

  res.redirect("https://" + req.hostname + ":" + HTTPS_PORT + req.url);
}

module.exports = httpToHttpsRedirect;
