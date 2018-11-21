import Router from "express-promise-router"

import v1Api from "./v1/v1-routes"

const router = Router()

async function setup() {
  router.use("/v1", await v1Api)
}

setup()

export default router
