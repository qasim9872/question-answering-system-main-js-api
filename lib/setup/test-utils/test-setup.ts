import MongodbMemoryServer from "mongodb-memory-server"
import * as mongoose from "mongoose"
import * as supertest from "supertest"

import app from "../../app"

// MOCK GENERIC FILES
jest.mock("../../utils/list-routes")
jest.mock("../../setup/swagger")
jest.mock("../../utils/logger")

let mongoServer: any

export async function setupTests() {
  // May require additional time for downloading MongoDB binaries
  jasmine.DEFAULT_TIMEOUT_INTERVAL = 60000
  mongoServer = new MongodbMemoryServer()
  const mongoUri = await mongoServer.getConnectionString()
  await mongoose.connect(
    mongoUri,
    {
      useNewUrlParser: true
    }
  )
}

export async function teardownTests() {
  await Promise.all(
    mongoose.modelNames().map((model) => mongoose.model(model).createIndexes())
  )
  await mongoose.disconnect()
  mongoServer.stop()
  jasmine.DEFAULT_TIMEOUT_INTERVAL = 5000
}

export const server = supertest(app)
