const Queue = require("bull");
const { deletionProcess } = require("./deletion-queue-consumer");

const deletionQueue = new Queue("deletion-queue", {});

deletionQueue.process(deletionProcess);

const deleteTweetJob = async (data) => {
  deletionQueue.add(data, { removeOnComplete: true });
};

module.exports = { deleteTweetJob, deletionQueue };
