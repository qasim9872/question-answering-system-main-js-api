import app from "./app"
import { serverPort } from "./config/server.config"

import { Logger } from "./utils/logger"
const logger = Logger.getLogger(__filename)

const PORT = serverPort

app.listen(PORT, () => {
  logger.info(`Express server listening on port ${PORT}`)
})
