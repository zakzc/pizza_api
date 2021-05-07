const express = require("express");
// init
const app = express();
require("dotenv").config();
// variables:
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
// log
const logger = require("./api/utils/logger");
/// Start up process
require("./api/startUp/logs")();
require("./api/startUp/apiRoutes")(app);
require("./api/startUp/db_connection")();
require("./api/startUp/config")();
require("./api/startUp/prod")(app);

let port;

if (process.env.NODE_ENV === "test") {
  port = process.env.TEST_PORT || 5000;
} else {
  port = process.env.PORT || 3000;
}

const server = app.listen(port, () =>
  logger.info(`App listening on port: ${port}\n`)
);

module.exports = server;
