import querystring = require("querystring")
import * as rp from "request-promise"
import { nmtBaseUrl } from "../../config-details/nmt.config"
import IQuestion from "../../interface/question.interface"
import QuestionModel from "../../model/question"
import { IUserModel } from "../../model/user"
import getResult from "../helper/knowledge-graphs/db-pedia.results"
import decoder from "../helper/nmt/sparql.decoder"
import sanitizer from "../helper/question/sanitize-question"
import { saveSession } from "../helper/user/session"

export function getConfig(question: string) {
  const params = {
    source: question
  }

  return {
    method: "GET",
    uri: `${nmtBaseUrl}?${querystring.stringify(params)}`
  }
}

export async function saveQuestion(data: IQuestion) {
  const dataModel = await QuestionModel.create(data)
  return dataModel.id
}

export default async function(
  user: IUserModel,
  session: Express.Session | null,
  question: string
) {
  // sanitize and clean question
  const sanitizedQuestion = sanitizer(question)

  // call python nmt api
  const options = getConfig(sanitizedQuestion)
  const encodedSparql = await rp(options)
  console.log(encodedSparql)

  // decode sparql
  const sparqlQuery = decoder(encodedSparql)

  // get results
  const results = await getResult(sparqlQuery)

  // save question to db
  const answerId = await saveQuestion({
    question,
    query: sparqlQuery,
    results,
    askedBy: user ? user.id : undefined
  })

  if (!user && session) {
    // Update the session
    if (!session.asked) {
      session.asked = []
    }
    session.asked.push(answerId)
    await saveSession(session)
  }

  return answerId
}
