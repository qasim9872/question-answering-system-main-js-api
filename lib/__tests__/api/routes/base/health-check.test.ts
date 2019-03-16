import {
  server,
  setupTests,
  teardownTests
} from "../../../../setup/test-utils/test-setup"

const baseEndpoint = `/api/v1`
const healthCheckEndpoint = `${baseEndpoint}/health-check`

beforeAll(setupTests)
afterAll(teardownTests)

describe(`GET ${healthCheckEndpoint}`, async () => {
  it(`should return 200`, async (done) => {
    server.get(healthCheckEndpoint).expect(200, async (err, response) => {
      expect(response.body.api_version).toBe("v1")
      expect(response.body.endpoint_name).toBe("health-check")
      expect(response.body.app_name).toBe("final year project app")

      done(err)
    })
  })
})
