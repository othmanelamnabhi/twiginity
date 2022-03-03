const path = require("path");
const fs = require("fs");

const HTTPS_PORT = process.env.HTTPS_PORT;
// const HTTPS_OPTIONS = {
//   key: fs.readFileSync(path.join(__dirname, "..", "key.pem")),
//   cert: fs.readFileSync(path.join(__dirname, "..", "cert.pem")),
// };

module.exports = {
  HTTPS_PORT,
};
