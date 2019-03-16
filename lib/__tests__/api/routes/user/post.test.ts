import UserModel from "../../../../model/user"
import {
  server,
  setupTests,
  teardownTests
} from "../../../../setup/test-utils/test-setup"

const baseEndpoint = `/api/v1`
const userEndpoint = `${baseEndpoint}/user`

beforeAll(setupTests)
afterAll(teardownTests)

describe(`POST ${userEndpoint}`, async () => {
  it(`should return 400 if body is empty`, async (done) => {
    server.post(userEndpoint).expect(400, async (err) => {
      done(err)
    })
  })

  it(`should create a new user in db`, async (done) => {
    const name = "test user"
    const username = "testuser"
    const email = "test@user.com"
    const password = "password"

    server
      .post(userEndpoint)
      .send({
        name,
        username,
        email,
        password
      })
      .expect(201, async (err) => {
        const users = await UserModel.find({ email })

        expect(users).toBeDefined()
        expect(users.length).toBe(1)

        const user = users[0]

        expect(user.name).toBe(name)
        expect(user.username).toBe(username)
        expect(user.email).toBe(email)

        expect(user.image).toBeDefined()

        done(err)
      })
  })

  describe(`with pre-existing user`, async () => {
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

    it(`should throw error if user with email already exists`, async (done) => {
      server
        .post(userEndpoint)
        .send({
          name,
          username,
          email,
          password
        })
        .expect(409, async (err) => {
          done(err)
        })
    })
  })
})
