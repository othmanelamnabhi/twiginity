const Bee = require("bee-queue");
module.exports = {
  Bee,
  queues: [
    {
      name: "deletion-queue",
      url: `redis://default:${process.env.REDIS_PASSWORD}@${process.env.REDIS_URL}:${process.env.REDIS_PORT}`,
      hostId: "heroku",
      type: "bee",
    },
  ],
};
