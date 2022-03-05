module.exports = require("redis").createClient({
  url: `redis://default:${process.env.REDIS_PASSWORD}@${process.env.REDIS_URL}:${process.env.REDIS_PORT}`,
});
