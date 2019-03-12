import Router from "express-promise-router"

import { handler as getUserHandler } from "./get.route"

const router = Router()

router.get("/:username", getUserHandler)

export default router
