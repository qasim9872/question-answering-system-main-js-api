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

describe(`PUT ${userEndpoint}`, async () => {
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
    server.put(userEndpoint).expect(401, async (err) => {
      done(err)
    })
  })

  it(`should throw an error if argument supplied has invalid type`, async (done) => {
    server
      .put(userEndpoint)
      .set({ Authorization: token })
      .send({
        image: { test: "val" }
      })
      .expect(400, async (err) => {
        done(err)
      })
  })

  it(`should update user's image url`, async (done) => {
    const image = "http://test.image.io"
    server
      .put(userEndpoint)
      .set({ Authorization: token })
      .send({
        image
      })
      .expect(200, async (err, res) => {
        expect(res).toBeDefined()
        expect(res.body).toBeDefined()

        const user = await UserModel.findOne({ email })
        if (!user) {
          throw new Error(`User not found`)
        }

        expect(user).toBeDefined()
        expect(user.image).toBe(image)

        done(err)
      })
  })

  it(`should update user's bio`, async (done) => {
    const bio = "This is my new bio"
    server
      .put(userEndpoint)
      .set({ Authorization: token })
      .send({
        bio
      })
      .expect(200, async (err, res) => {
        expect(res).toBeDefined()
        expect(res.body).toBeDefined()

        const user = await UserModel.findOne({ email })
        if (!user) {
          throw new Error(`User not found`)
        }

        expect(user).toBeDefined()
        expect(user.bio).toBe(bio)

        done(err)
      })
  })

  it(`should update user's password`, async (done) => {
    const newPassword = "new-password"
    server
      .put(userEndpoint)
      .set({ Authorization: token })
      .send({
        password: newPassword
      })
      .expect(200, async (err, res) => {
        expect(res).toBeDefined()
        expect(res.body).toBeDefined()

        const user = (await UserModel.findOne({ email }).select(
          "+password"
        )) as any
        if (!user) {
          throw new Error(`User not found`)
        }

        // Check old password is invalid
        user.comparePassword(password, (error: Error, isMatch: boolean) => {
          expect(error).toBeFalsy()
          expect(isMatch).toBeFalsy()

          // Check new password is valid
          user.comparePassword(
            newPassword,
            (error1: Error, isMatch1: boolean) => {
              expect(error1).toBeFalsy()
              expect(isMatch1).toBeTruthy()
              done(err)
            }
          )
        })
      })
  })
})
