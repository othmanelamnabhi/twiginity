const Redis = require("ioredis");
global.redis = new Redis({ lazyConnect: true });

async function connectToRedis() {
  await redis.connect();
}

redis.once("connect", () => {
  console.log("Connected to Redis");
});

module.exports = connectToRedis;
