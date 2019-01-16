import Router from "express-promise-router"

import { handler as healthCheckHandler } from "./health-check.route"

const router = Router()

router.get("/health-check", healthCheckHandler)

export default router
