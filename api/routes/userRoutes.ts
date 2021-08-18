import * as express from "express"
//import {Router} as router from "express"
const router: any = express.Router()
// const morgan = require("morgan");
import * as morgan from "morgan"
// Middle
import  auth from "../middleware/auth"
import asyncMiddleware from "../middleware/async";
/// control
const userControls = require("../controls/userControls");
// Logs
//const logger = require("../utils/logger");
///
process.env.NODE_ENV === "development" ? console.log("User routes connected") : router.use(morgan("tiny"))

router.post("/register", asyncMiddleware(userControls.registerUser));

router.post("/logIn", asyncMiddleware(userControls.logIn));

router.get("/me", auth, asyncMiddleware(userControls.getCurrentUser));

export default router;
