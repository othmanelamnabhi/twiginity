require("dotenv").config();
const fs = require("fs");
const http = require("http");
const https = require("https");
const connectToDatabase = require("./helpers/dbConnection");

const {
  HTTPS_OPTIONS,
  HTTPS_PORT,
  HTTP_PORT,
} = require("./helpers/serverConfig");
const app = require("./app");

const server = http.createServer(app);
const httpsServer = https.createServer(HTTPS_OPTIONS, app);

async function startServer() {
  try {
    await connectToDatabase();

    server.listen(HTTP_PORT, () => {
      console.log(`Example app listening at http://localhost:${HTTP_PORT}`);
    });

    httpsServer.listen(HTTPS_PORT, () => {
      console.log(`Example app listening at https://localhost:${HTTPS_PORT}`);
    });
  } catch (error) {
    console.error(error);
  }
}

startServer();
