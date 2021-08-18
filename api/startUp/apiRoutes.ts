import * as express from "express";
// libs
import * as morgan from "morgan";
//import logger from "../utils/logger";
//const logger = require("../utils/logger");
// middle
import errorMessage from "../middleware/error";
// routes
import * as menuRoutes from "../routes/menuRoutes";
import * as  userRoutes from "../routes/userRoutes";

export default function setRoutes(app: any): void {
  /// debug routing
  if (process.env.NODE_ENV === "development") {
    console.log("App is running on " + process.env.NODE_ENV + " mode.\n");
    app.use(morgan("tiny"));
  }
  // pipe
  app.use(express.json());
  app.use("/menu_api", menuRoutes);
  app.use("/user_api", userRoutes);
  app.use((req: any, res: any) => {
    res.status(404).send("Route not found");
  });
  app.use(errorMessage);
};
