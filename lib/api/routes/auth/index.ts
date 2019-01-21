import Router from "express-promise-router"

/* tslint:disable:no-var-requires */
const validate = require("express-validation")

import { login } from "../../../setup/passport"

import { handler as loginHandler, schema as loginSchema } from "./login.route"

const router = Router()

router.post("/login", validate(loginSchema), login(), loginHandler)

export default router
