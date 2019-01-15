import querystring = require("querystring")
import * as rp from "request-promise"
import { nmtBaseUrl } from "./../config/nmt.config"
import getResult from "./result"
import decoder from "./sparql"

function getConfig(question: string) {
  const params = {
    source: question
  }

  return {
    method: "GET",
    uri: `${nmtBaseUrl}?${querystring.stringify(params)}`
  }
}

export default async function(question: string) {
  // call python nmt api
  const options = getConfig(question)
  const encodedSparql = await rp(options)

  // decode sparql
  const sparqlQuery = decoder(encodedSparql)

  // get results
  const results = await getResult(sparqlQuery)

  return {
    query: sparqlQuery,
    results
  }
}
