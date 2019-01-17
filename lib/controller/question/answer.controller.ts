import querystring = require("querystring")
import * as rp from "request-promise"
import { nmtBaseUrl } from "../../config-details/nmt.config"
import IQuestion from "../../interface/question.interface"
import QuestionModel from "../../model/question"
import getResult from "../helper/knowledge-graphs/db-pedia.results"
import decoder from "../helper/nmt/sparql.decoder"

function getConfig(question: string) {
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
  return dataModel.toObject()
}

export default async function(question: string) {
  // sanitize and clean question

  // call python nmt api
  const options = getConfig(question)
  const encodedSparql = await rp(options)

  // decode sparql
  const sparqlQuery = decoder(encodedSparql)

  // get results
  const results = await getResult(sparqlQuery)

  // save to db
  const dataModel = await saveQuestion({
    question,
    query: sparqlQuery,
    results
  })

  return dataModel
}