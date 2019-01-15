// Bring Mongoose into the app
import * as mongoose from "mongoose"

import Logger from "../utils/logger"
const logger = Logger.getLogger(__filename)

// Build the connection string
import { host, name, port } from "../config/mongodb.config"
const dbURI = `mongodb://${host}:${port}/${name}`

// Create the database connection
export default async function setupMongoose() {
  await mongoose.connect(
    dbURI,
    {
      useNewUrlParser: true
    }
  )
}

// CONNECTION EVENTS
// When successfully connected
mongoose.connection.on("connected", () => {
  logger.info("Mongoose default connection open to " + dbURI)
})

// If the connection throws an error
mongoose.connection.on("error", (err) => {
  logger.error("Mongoose default connection error: " + err)
})

// When the connection is disconnected
mongoose.connection.on("disconnected", () => {
  logger.info("Mongoose default connection disconnected")
})

// If the Node process ends, close the Mongoose connection
process.on("SIGINT", () => {
  mongoose.connection.close(() => {
    logger.info(
      "Mongoose default connection disconnected through app termination"
    )
    process.exit(0)
  })
})
