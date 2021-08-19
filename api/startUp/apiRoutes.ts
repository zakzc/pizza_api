import * as express from "express";
// libs
import * as morgan from "morgan";
// utils
import Logger from "../utils/logger";
// middle
import errorMessage from "../middleware/error";
// routes
import menuRouter from "../routes/menuRouter";
import userRouter from "../routes/userRouter";

export default function setRoutes(app: any): void {
  /// debug routing
  if (process.env.NODE_ENV === "development") {
    Logger.info("App is running on " + process.env.NODE_ENV + " mode.\n");
    app.use(morgan("tiny"));
  }
  // pipe
  app.use(express.json());
  app.use("/menu_api", menuRouter);
  app.use("/user_api", userRouter);
  app.use((req: any, res: any) => {
    res.status(404).send("Route not found");
  });
  app.use(errorMessage);
};
