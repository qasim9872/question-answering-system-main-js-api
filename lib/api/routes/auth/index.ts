import Router from "express-promise-router"

/* tslint:disable:no-var-requires */
const validate = require("express-validation")

import { isAuthenticated, login } from "../../../setup/passport"

import { handler as loginHandler, schema as loginSchema } from "./login.route"
import {
  handler as registrationHandler,
  schema as registrationSchema
} from "./register.route"
import { handler as userHandler } from "./user.route"

const router = Router()

router.post("/login", validate(loginSchema), login(), loginHandler)
router.post("/register", validate(registrationSchema), registrationHandler)
router.post("/user", isAuthenticated(), userHandler)

export default router
