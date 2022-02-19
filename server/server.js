require("dotenv").config();
const fs = require("fs");
const http = require("http");
const https = require("https");
const connectToDatabase = require("./helpers/dbConnection");
const { Server } = require("socket.io");
const Redis = require("ioredis");
global.redis = new Redis();

const { HTTPS_OPTIONS, HTTPS_PORT, HTTP_PORT } = require("./helpers/serverConfig");
const app = require("./app");

const server = http.createServer(app);
const httpsServer = https.createServer(HTTPS_OPTIONS, app);

global.io = new Server(httpsServer, {
  cors: { origin: "*" },
});

io.on("connection", (socket) => {
  console.log("new connection => ", socket.id, socket.handshake.query.twitterId);
  redis.hset(
    `user`,
    `${socket.handshake.query.twitterId}`,
    `${socket.id}`,
    (err, result) => {
      if (err) {
        console.error(err);
      } else {
        console.log(result);
      }
    }
  );

  socket.on("disconnect", () => console.log("disconnected"));
});

process.on("SIGINT", () => {
  console.log("exiting…");
  process.exit();
});

process.on("uncaughtException", function (err) {
  console.error("global exception:", err);
});

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
