import genToken from "../../../../controller/auth/login.controller"
import UserModel, { IUserModel } from "../../../../model/user"
import {
  server,
  setupTests,
  teardownTests
} from "../../../../setup/test-utils/test-setup"

const baseEndpoint = `/api/v1`
const userEndpoint = `${baseEndpoint}/user`

beforeAll(setupTests)
afterAll(teardownTests)

describe(`GET ${userEndpoint}`, async () => {
  const name = "test user1"
  const username = "testuser1"
  const email = "test@user1.com"
  const password = "password"
  let token: string

  beforeAll(async (done) => {
    const user = await UserModel.create({
      name,
      username,
      email,
      password
    })

    token = `Bearer ${genToken(user)}`
    done()
  })

  it(`should throw an error if token is missing`, async (done) => {
    server.get(userEndpoint).expect(401, async (err) => {
      done(err)
    })
  })

  it(`should throw an error if token is invalid`, async (done) => {
    server
      .get(userEndpoint)
      .set({ Authorization: "invalid.token" })
      .expect(401, async (err) => {
        done(err)
      })
  })

  it(`should return user data when the token is valid`, async (done) => {
    server
      .get(userEndpoint)
      .set({ Authorization: token, json: true })
      .expect(200, async (err, res) => {
        expect(res).toBeDefined()
        expect(res.body).toBeDefined()

        const userData = res.body

        expect(userData.name).toBe(name)
        expect(userData.username).toBe(username)
        expect(userData.email).toBe(email)

        done(err)
      })
  })
})
