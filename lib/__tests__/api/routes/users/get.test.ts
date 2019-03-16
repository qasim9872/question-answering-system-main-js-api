import UserModel from "../../../../model/user"
import {
  server,
  setupTests,
  teardownTests
} from "../../../../setup/test-utils/test-setup"

const baseEndpoint = `/api/v1`
const usersEndpoint = `${baseEndpoint}/users`

beforeAll(setupTests)
afterAll(teardownTests)

describe(`GET ${usersEndpoint}`, async () => {
  const name = "test user1"
  const username = "testuser1"
  const email = "test@user1.com"
  const password = "password"

  beforeAll(async (done) => {
    await UserModel.create({
      name,
      username,
      email,
      password
    })
    done()
  })

  it(`should throw an error if no user exists with the given username`, async (done) => {
    server.get(`${usersEndpoint}/testuser`).expect(404, async (err) => {
      done(err)
    })
  })

  it(`should get the user with the given username`, async (done) => {
    server
      .get(`${usersEndpoint}/${username}`)
      .expect(200, async (err, response) => {
        expect(response).toBeDefined()
        expect(response.body).toBeDefined()

        const userData = response.body

        expect(userData.name).toBe(name)
        expect(userData.username).toBe(username)
        expect(userData.email).toBe(email)

        expect(userData.asked.length).toBe(0)
        expect(userData.likes.length).toBe(0)
        expect(userData.dislikes.length).toBe(0)

        done(err)
      })
  })
})
