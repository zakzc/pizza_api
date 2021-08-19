import * as express from "express";
/// start up
import setRoutes from "./api/startUp/apiRoutes";
import makeConnection  from "./api/startUp/db_connection";
import config from "./api/startUp/config";
import prod from "./api/startUp/prod";
// utils
import Logger from "./api/utils/logger";

// init
const app = express();

// env variables during dev
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();}

// start up process
setRoutes(app);
makeConnection();
config();
prod(app);

let port: number | string ;

process.env.NODE_ENV === "test" ? port = process.env.TEST_PORT || 5000 : port = process.env.PORT || 3000;

export const server = app.listen(port, () =>
  Logger.info(`App listening on port: ${port}\n`)
);


