const Queue = require("bull");
const { deletionProcess } = require("./deletion-queue-consumer");

const deletionQueue = new Queue("deletion-queue", {
  // delete jobs on successful completion
});

deletionQueue.process(deletionProcess);

const deleteTweetJob = async (data) => {
  deletionQueue.add(data);
};

module.exports = { deleteTweetJob, deletionQueue };
