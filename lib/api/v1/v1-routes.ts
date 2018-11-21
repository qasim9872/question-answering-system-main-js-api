import { join } from "path"

import { bootstrapRoutes } from "../../utils/api-setup"

import Logger from "../../utils/logger"
const logger = Logger.getLogger(__filename)

const routes = join(__dirname, "routes")

const router = bootstrapRoutes(routes, logger)

export default router
