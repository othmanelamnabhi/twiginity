require("dotenv").config();
const http = require("http");
const connectToDatabase = require("./helpers/dbConnection");
redis = require("./helpers/redisConnection");
const { Server } = require("socket.io");

const app = require("./app");

const httpServer = http.createServer(app);

global.io = new Server(httpServer, {
  cors: { origin: "*" },
});

io.on("connection", async (socket) => {
  console.log("new connection => ", socket.id, socket.handshake.query.twitterId);
  redis.HSET(`user`, `${socket.handshake.query.twitterId}`, `${socket.id}`);

  socket.on("disconnect", () => console.log("disconnected"));
});

process.on("uncaughtException", function (err) {
  console.error("global exception:", err);
});

async function startServer() {
  try {
    await connectToDatabase();
    await redis.connect();

    httpServer.listen(process.env.PORT, () => {
      console.log(`Twignity app listening at https://localhost:${process.env.PORT}`);
      console.log(process.env.NODE_ENV);
    });
  } catch (error) {
    console.error(error);
  }
}

startServer();
