require("dotenv").config();
const fs = require("fs");
const http = require("http");
const connectToDatabase = require("./helpers/dbConnection");
const connectToRedis = require("./helpers/redisConnection");
const { Server } = require("socket.io");

const { HTTPS_PORT } = require("./helpers/serverConfig");
const app = require("./app");

const httpServer = http.createServer(app);

global.io = new Server(httpServer, {
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

process.on("uncaughtException", function (err) {
  console.error("global exception:", err);
});

async function startServer() {
  try {
    await connectToDatabase();
    await connectToRedis();

    // server.listen(HTTP_PORT, () => {
    //   console.log(`Example app listening at http://localhost:${HTTP_PORT}`);
    // });

    httpServer.listen(HTTPS_PORT, () => {
      console.log(`Twignity app listening at https://localhost:${HTTPS_PORT}`);
    });
  } catch (error) {
    console.error(error);
  }
}

startServer();
