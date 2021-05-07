// libs
const express = require("express");
const morgan = require("morgan");
const router = express.Router();
/// middle
const admin = require("../middleware/admin");
const asyncMiddleware = require("../middleware/async");
const auth = require("../middleware/auth");
// const validObjectId = require("../middleware/validObjectId");
/// control
const menuControls = require("../controls/menuControls");
// Logs
const logger = require("../utils/logger");
///
if (process.env.NODE_ENV === "development") {
  logger.info("Menu routes connected");
  router.use(morgan("tiny"));
}

router.get("/pizzaMenu/getMenu", asyncMiddleware(menuControls.getCompleteMenu));

router.get("/pizzaMenu/getItem/:id", asyncMiddleware(menuControls.getMenuItem));

router.post(
  "/pizzaMenu/addPizza",
  auth,
  asyncMiddleware(menuControls.addNewMenuItem)
);

router.put(
  "/pizzaMenu/updateMenu/:id",
  auth,
  asyncMiddleware(menuControls.updateMenu)
);

router.delete(
  "/pizzaMenu/deleteItem/:id",
  [auth, admin],
  asyncMiddleware(menuControls.deleteMenuItem)
);

module.exports = router;
