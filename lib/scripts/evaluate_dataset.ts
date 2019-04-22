import * as rp from "request-promise"
import { hostAddress } from "../config-details/server.config"
import { getList } from "../controller/question/list.controller"

import Logger from "../utils/logger"
const logger = Logger.getLogger(__filename)

function getConfig(question: string) {
  return {
    method: "POST",
    uri: `http://${hostAddress}/api/v1/question/evaluate`,
    body: {
      question
    },
    json: true
  }
}

export async function evaluate() {
  const list = await getList()

  let invalid = 0
  const invalidQuestions: string[] = []
  let inaccurate = 0
  const inaccurateQuestions: string[] = []
  let valid = 0

  let count = 0

  for (const question of list) {
    logger.info(`Question no. ${count}`)
    const config = getConfig(question)
    const response = await rp(config)

    if (response.invalid) {
      invalid++
      invalidQuestions.push(question)
    }

    if (response.inaccurate) {
      inaccurate++
      inaccurateQuestions.push(question)
    }

    if (response.valid) {
      valid++
    }
    count++
  }

  logger.info({
    total: list.length,
    invalid,
    inaccurate,
    correct: valid
  })

  logger.info(`invalid questions`)
  logger.info(invalidQuestions)

  logger.info(`inaccurate questions`)
  logger.info(inaccurateQuestions)
}

evaluate()
