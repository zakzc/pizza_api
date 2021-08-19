import * as express from "express"
import * as morgan from "morgan"
import * as userControls from "../controls/userControls"
// Middle
import  auth from "../middleware/auth"
import asyncMiddleware from "../middleware/async"
// utils
import Logger from "../utils/logger"

const userRouter = express.Router()

process.env.NODE_ENV === "development" ? Logger.info("User routes on") : userRouter.use(morgan("tiny"))

userRouter.post("/register", asyncMiddleware(userControls.registerUser));

userRouter.post("/logIn", asyncMiddleware(userControls.logIn));

userRouter.get("/me", auth, asyncMiddleware(userControls.getCurrentUser));

export default userRouter
