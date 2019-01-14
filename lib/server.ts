import http = require("http")

import app from "./app"
import { serverPort } from "./config/server.config"

import Logger from "./utils/logger"
const logger = Logger.getLogger(__filename)

const PORT = serverPort

const server = http.createServer(app)

server.listen(PORT, "0.0.0.0", () => {
  logger.info(`Express server listening on port ${PORT}`)
})

