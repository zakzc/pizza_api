import * as express from "express";
/// start up
import setRoutes from "./api/startUp/apiRoutes";
import makeConnection  from "./api/startUp/db_connection";
import config from "./api/startUp/config";
import prod from "./api/startUp/prod";

// init
const app = express();
//require("dotenv").config();

// variables:
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();}


setRoutes(app);
makeConnection();
config();
prod(app);

let port: number | string ;

process.env.NODE_ENV === "test" ? port = process.env.TEST_PORT || 5000 : port = process.env.PORT || 3000;

const server = app.listen(port, () =>
  console.log(`App listening on port: ${port}\n`)
);

module.exports = server;
