const express = require("express");
// libs
const morgan = require("morgan");
//const logger = require("../utils/logger");
// middle
const error = require("../middleware/error");
// routes
const menuRoutes = require("../routes/menuRoutes");
const userRoutes = require("../routes/userRoutes");

module.exports = function (app) {
  /// debug routing
  if (process.env.NODE_ENV === "development") {
    console.log("App is running on " + process.env.NODE_ENV + " mode.\n");
    app.use(morgan("tiny"));
  }
  // pipe
  app.use(express.json());
  app.use("/menu_api", menuRoutes);
  app.use("/user_api", userRoutes);
  app.use((req, res) => {
    res.status(404).send("Route not found");
  });
  app.use(error);
};
