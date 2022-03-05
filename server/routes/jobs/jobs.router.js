const express = require("express");
const jobsRouter = express.Router();
const Arena = require("bull-arena");

const GUIConfig = require("../../queue/gui/arena");
const isAdmin = require("../../helpers/isAdmin");

jobsRouter.use(
  "/",
  isAdmin,
  Arena(GUIConfig, {
    disableListen: true,
  })
);

module.exports = jobsRouter;
