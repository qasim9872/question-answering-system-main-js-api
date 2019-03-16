import * as jwt from "jsonwebtoken"
import { appSecret } from "../../../../config-details/server.config"

import UserModel from "../../../../model/user"
import {
  server,
  setupTests,
  teardownTests
} from "../../../../setup/test-utils/test-setup"

const baseEndpoint = `/api/v1`
const loginEndpoint = `${baseEndpoint}/auth/login`

beforeAll(setupTests)
afterAll(teardownTests)

describe(`POST ${loginEndpoint}`, async () => {
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

  it(`should throw error if email or password not provided`, async (done) => {
    server
      .post(loginEndpoint)
      .send({})
      .expect(400, async (err) => {
        done(err)
      })
  })

  it(`should let a user log in`, async (done) => {
    server
      .post(loginEndpoint)
      .send({
        email,
        password
      })
      .expect(200, async (err) => {
        done(err)
      })
  })

  it(`should let a user log in and returns a valid token`, async (done) => {
    server
      .post(loginEndpoint)
      .send({
        email,
        password
      })
      .expect(200, async (err, res) => {
        expect(res).toBeDefined()
        expect(res.body).toBeDefined()
        expect(res.body.token).toBeDefined()

        const user = await UserModel.findOne({ email })
        // Check added so typescript doesn't complain about user being null
        if (!user) {
          throw new Error(`user not found`)
        }

        const token = res.body.token

        const decoded = jwt.verify(token, appSecret)

        expect(decoded).toBeDefined()
        expect(decoded).toEqual(expect.objectContaining({ id: user.id }))

        done(err)
      })
  })

  it(`should throw error if user tries to log in with the wrong password`, async (done) => {
    server
      .post(loginEndpoint)
      .send({
        email,
        password: "wrong-password"
      })
      .expect(401, async (err) => {
        done(err)
      })
  })

  it(`should throw error if user tries to log in with the wrong email`, async (done) => {
    server
      .post(loginEndpoint)
      .send({
        email: "wrong@email.com",
        password
      })
      .expect(401, async (err) => {
        done(err)
      })
  })
})
