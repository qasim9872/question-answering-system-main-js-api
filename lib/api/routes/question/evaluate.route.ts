import { Request, Response } from "express"
import * as rp from "request-promise"

import getResult from "../../../controller/helper/knowledge-graphs/db-pedia.results"
import decoder from "../../../controller/helper/nmt/sparql.decoder"
import sanitizer from "../../../controller/helper/question/sanitize-question"
import { getConfig } from "../../../controller/question/answer.controller"

function isAccurate(question: string, query: string, invalid: boolean) {
  if (!invalid) {
    const prefix = "dbr_"
    const regex = new RegExp(`${prefix}(\\S*)`, "g")
    const cleaned = query.replace(/\(.*\)/, "")
    const match = cleaned.match(regex)
    if (match && match.length > 0) {
      let resourceName = match[0].slice(prefix.length).toLowerCase()
      resourceName = resourceName.replace(/[^a-z]/g, " ")

      for (const resource of resourceName.split(" ")) {
        if (!question.includes(resource.trim())) {
          console.log(question)
          console.log(query)
          console.log(resourceName)
          console.log(resource)
          console.log("--------------------------\n")

          return false
        }
      }

      return true
    }
  }
  return false
}

/**
 * @typedef evaluateBody
 * @property {string} question.required - The question to evaluate
 */

/**
 * This route executes the given question and returns informations about it
 * @route POST /question/evaluate
 * @group Question - Processing questions
 * @param {evaluateBody.model} evaluateBody.body.required - the body
 * @returns {object} 200 - Question List
 * @returns {Error}  default - Unexpected error
 */

export async function handler(req: Request, res: Response) {
  const { question } = req.body

  if (!question) {
    throw new Error("missing question in body")
  }

  const sanitizedQuestion = sanitizer(question)
  // call python nmt api
  const options = getConfig(sanitizedQuestion)
  const encodedSparql = await rp(options)

  const sparqlQuery = decoder(encodedSparql)
  const results = await getResult(sparqlQuery)

  const result = results.length > 0 ? results[0] : null

  const invalid = Boolean(result && result.source === "Server")
  const accurate = isAccurate(question, encodedSparql, invalid)
  const correct = !invalid && accurate

  res.status(200).json({
    sanitized: sanitizedQuestion,
    encodedSparql,
    sparqlQuery,
    results,
    invalid,
    inaccurate: !accurate,
    valid: correct
  })
}
