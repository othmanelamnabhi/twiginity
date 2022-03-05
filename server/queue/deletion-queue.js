const Queue = require("bee-queue");
redis = require("../helpers/redisConnection");

const { deletionProcess } = require("./deletion-queue-consumer");

const deletionQueue = new Queue("deletion-queue", {
  removeOnSuccess: true,
  storeJobs: false,
  redis: `redis://default:${process.env.REDIS_PASSWORD}@${process.env.REDIS_URL}:${process.env.REDIS_PORT}`,
  getEvents: false,
});

deletionQueue.process(10, deletionProcess);

const deleteTweetJob = async (data) => {
  deletionQueue.createJob(data).retries(1).timeout(5000).save();
};

module.exports = { deleteTweetJob, deletionQueue };
