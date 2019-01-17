import http = require("http")

// Setup
import mongooseSetup from "./setup/mongoose"

import app from "./app"
import { serverPort as PORT } from "./config-details/server.config"

import Logger from "./utils/logger"
const logger = Logger.getLogger(__filename)

const server = http.createServer(app)

mongooseSetup().then(() => {
  server.listen(PORT, "0.0.0.0", () => {
    logger.info(`Express server listening on port ${PORT}`)
  })
})
