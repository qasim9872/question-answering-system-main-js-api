import Router from "express-promise-router"

import { handler as overallStatsHandler } from "./overall.route"

const router = Router()

router.get("/overall", overallStatsHandler)

export default router
