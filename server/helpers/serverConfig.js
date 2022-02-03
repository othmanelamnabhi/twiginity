const path = require("path");
const fs = require("fs");

// Set ports to either value present on .env file else a default value
const HTTP_PORT = process.env.HTTP_PORT || 5002;
const HTTPS_PORT = process.env.HTTPS_PORT || 5001;
const HTTPS_OPTIONS = {
  key: fs.readFileSync(path.join(__dirname, "..", "key.pem")),
  cert: fs.readFileSync(path.join(__dirname, "..", "cert.pem")),
};

module.exports = {
  HTTPS_OPTIONS,
  HTTPS_PORT,
  HTTP_PORT,
};
