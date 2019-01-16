import Router from "express-promise-router"

import { handler as loginHandler } from "./login.route"
import { handler as registrationHandler } from "./register.route"

const router = Router()

router.post("/login", loginHandler)
router.post("/register", registrationHandler)

export default router
