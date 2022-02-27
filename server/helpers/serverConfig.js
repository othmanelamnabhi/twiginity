const path = require("path");
const fs = require("fs");

// Set ports to either value present on .env file else a default value
const HTTPS_PORT = process.env.HTTPS_PORT || 50000;
const HTTPS_OPTIONS = {
  key: fs.readFileSync(path.join(__dirname, "..", "key.pem")),
  cert: fs.readFileSync(path.join(__dirname, "..", "cert.pem")),
};

module.exports = {
  HTTPS_OPTIONS,
  HTTPS_PORT,
};
