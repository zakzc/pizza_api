// libs
import * as express from "express";
import * as morgan from "morgan";
/// middle
import admin from "../middleware/admin";
import  auth from "../middleware/auth"
import asyncMiddleware from "../middleware/async";
// const validObjectId = require("../middleware/validObjectId");
/// control
const menuControls = require("../controls/menuControls");
// Util
import Logger from "../utils/logger";

const menuRouter = express.Router()

process.env.NODE_ENV === "development" ? Logger.info("Menu routes on") : menuRouter.use(morgan("tiny"))

menuRouter.get("/pizzaMenu/getMenu", asyncMiddleware(menuControls.getCompleteMenu));

menuRouter.get("/pizzaMenu/getItem/:id", asyncMiddleware(menuControls.getMenuItem));

menuRouter.post(
  "/pizzaMenu/addPizza",
  auth,
  asyncMiddleware(menuControls.addNewMenuItem)
);

menuRouter.put(
  "/pizzaMenu/updateMenu/:id",
  auth,
  asyncMiddleware(menuControls.updateMenu)
);

menuRouter.delete(
  "/pizzaMenu/deleteItem/:id",
  [auth, admin],
  asyncMiddleware(menuControls.deleteMenuItem)
);

export default menuRouter;
