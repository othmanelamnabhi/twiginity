const Queue = require("bee-queue");

const { deletionProcess } = require("./deletion-queue-consumer");

const deletionQueue = new Queue("deletion-queue", {
  removeOnSuccess: false,
  storeJobs: false,
});

deletionQueue.process(10, deletionProcess);

const deleteTweetJob = async (data) => {
  deletionQueue.createJob(data).save();
};

module.exports = { deleteTweetJob, deletionQueue };
