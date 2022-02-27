// const Queue = require("bull");
const Queue = require("bee-queue");

const { deletionProcess } = require("./deletion-queue-consumer");

const deletionQueue = new Queue("deletion-queue", {
  removeOnSuccess: false,
  storeJobs: false,
});

deletionQueue.process(10, deletionProcess);

// deletionQueue.on("completed", (job) => {
//   console.log(`Job with id ${job.id} ${job.socketId} has been completed`);
// });

const deleteTweetJob = async (data) => {
  // deletionQueue.add(data /*{ removeOnComplete: true }*/);
  deletionQueue
    .createJob(data)
    .save()
    .then(() => console.log("job added to queue"));
};

module.exports = { deleteTweetJob, deletionQueue };
