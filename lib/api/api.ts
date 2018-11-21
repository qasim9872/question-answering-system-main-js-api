import Router from "express-promise-router"

import v1Api from "./v1/v1-routes"

const router = Router()

router.use("/v1", v1Api)

export default router
