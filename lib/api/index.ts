import Router from "express-promise-router"

import routes from "./routes"

const router = Router()

router.use("/v1", routes)

export default router
