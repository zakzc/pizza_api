import * as express from "express";
// init
const app = express();
require("dotenv").config();
// variables:
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
import * as setRoutes from "./api/startUp/apiRoutes";
import * as makeConnection  from "./api/startUp/db_connection";
import * as config from "./api/startUp/config";
import * as prod from "./api/startUp/prod";

setRoutes(app);
makeConnection();
config();
prod(app);

let port: any;

if (process.env.NODE_ENV === "test") {
  port = process.env.TEST_PORT || 5000;
} else {
  port = process.env.PORT || 3000;
}

const server = app.listen(port, () =>
  console.log(`App listening on port: ${port}\n`)
);

module.exports = server;
