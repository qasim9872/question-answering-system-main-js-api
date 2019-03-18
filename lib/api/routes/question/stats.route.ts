import { Request, Response } from "express"
import * as rp from "request-promise"

import getResult from "../../../controller/helper/knowledge-graphs/db-pedia.results"
import decoder from "../../../controller/helper/nmt/sparql.decoder"
import { getConfig } from "../../../controller/question/answer.controller"
import { getList } from "../../../controller/question/list.controller"

/**
 * This route returns statistics of running all the questions
 * @route GET /question/stats
 * @group Question - Processing questions
 * @returns {object} 200 - Question List
 * @returns {Error}  default - Unexpected error
 */
export async function handler(req: Request, res: Response) {
  const data = (await getList()).slice(0, 100)

  let failed = 0
  let successful = 0
  let total = 0

  for (const question of data) {
    // call python nmt api
    const options = getConfig(question)
    const encodedSparql = await rp(options)

    const sparqlQuery = decoder(encodedSparql)
    const results = await getResult(sparqlQuery)

    const result = results.length > 0 ? results[0] : null
    if (result && result.source === "Server") {
      console.log(
        `the question: ${question} with index ${total} failed to run.`
      )
      failed++
    } else {
      successful++
    }

    total++
  }

  res.status(200).json({
    total,
    failed,
    successful
  })
}
