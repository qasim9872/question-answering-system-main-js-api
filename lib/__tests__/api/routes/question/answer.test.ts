jest.mock("../../../../controller/helper/knowledge-graphs/utils")

import * as nock from "nock"

import { nmtBaseUrl } from "../../../../config-details/nmt.config"
import genToken from "../../../../controller/auth/login.controller"
import QuestionModel from "../../../../model/question"
import UserModel from "../../../../model/user"
import {
  server,
  setupTests,
  teardownTests
} from "../../../../setup/test-utils/test-setup"

import { nmtMockServerData } from "../../../../setup/test-utils/nmt.pairs"

const baseEndpoint = `/api/v1`
const answerEndpoint = `${baseEndpoint}/question/answer`

beforeAll(setupTests)
afterAll(teardownTests)

describe(`POST ${answerEndpoint}`, async () => {
  const name = "test user1"
  const username = "testuser1"
  const email = "test@user1.com"
  const password = "password"
  let id: string
  let token: string

  beforeAll(async (done) => {
    const user = await UserModel.create({
      name,
      username,
      email,
      password
    })

    id = user.id
    token = `Bearer ${genToken(user)}`
    done()
  })

  it(`should throw an error if the question is not provided`, async (done) => {
    server.post(answerEndpoint).expect(400, async (err) => {
      done(err)
    })
  })

  describe(`logged in user`, async () => {
    let nmtMockServer: nock.Scope

    beforeAll(async (done) => {
      nmtMockServer = nock(nmtBaseUrl)
        .persist()
        .get("/")
        .query(true)
        .reply((uri: string) => {
          const input = decodeURI(uri)
          const match = input.match(/source=(.*)/)

          const englishSentence = match && match.length === 2 ? match[1] : null
          const pair = nmtMockServerData.find((value) => {
            return value.english === englishSentence
          })

          if (pair) {
            const sparql = pair.sparql
            return sparql
          } else {
            return null
          }
        })
      done()
    })

    afterAll(async (done) => {
      nmtMockServer.persist(false)
      done()
    })

    it(`should create a new question in the db and provide the id`, async (done) => {
      const question = "who is john farrar"

      server
        .post(answerEndpoint)
        .set({ Authorization: token, json: true })
        .send({
          question
        })
        .expect(201, async (err, response) => {
          expect(response).toBeDefined()
          expect(response.body).toBeDefined()
          expect(response.body.id).toBeDefined()

          const answerId = response.body.id

          const answer = await QuestionModel.findById(answerId)

          if (!answer || !answer.askedBy) {
            throw new Error("Answer or asked by object not found")
          }

          expect(answer.askedBy.toString() === id).toBeTruthy()
          expect(answer.question).toBe(question)

          done(err)
        })
    })
  })
})
