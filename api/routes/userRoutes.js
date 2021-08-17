const express = require("express");
const router = express.Router();
const morgan = require("morgan");
// Middle
const auth = require("../middleware/auth");
const asyncMiddleware = require("../middleware/async");
/// control
const userControls = require("../controls/userControls");
// Logs
const logger = require("../utils/logger");
///
if (process.env.NODE_ENV === "development") {
  console.log("User routes connected");
  router.use(morgan("tiny"));
}

router.post("/register", asyncMiddleware(userControls.registerUser));

router.post("/logIn", asyncMiddleware(userControls.logIn));

router.get("/me", auth, asyncMiddleware(userControls.getCurrentUser));

module.exports = router;
