import { join } from "path"
import * as rp from "request-promise"
import { readFile } from "../utils/file-system"

import { hostAddress } from "../config-details/server.config"
import Logger from "../utils/logger"

export async function loadFileFromContent(filename: string) {
  const pathToQuestionList = join(__dirname, "..", "content", filename)

  const data: string = (await readFile(pathToQuestionList)) as any

  // split lines
  const lines = data.split("\n")

  return lines
}

export function getConfig(question: string) {
  return {
    method: "POST",
    uri: `http://${hostAddress}/api/v1/question/evaluate`,
    body: {
      question
    },
    json: true
  }
}

export async function runEvaluationInParallel(
  list: string[],
  logger: Logger,
  parallelExecutions = 2
) {
  const total = list.length
  const step = list.length / parallelExecutions

  const subLists = []

  let handled = 0
  for (let i = 0; i < parallelExecutions; i++) {
    const end = i === parallelExecutions - 1 ? total : handled + step

    const subList = list.slice(handled, end)
    subLists.push(subList)

    handled += subList.length
  }

  const results: any = await Promise.all(
    subLists.map((subList, index) => runEvaluation(subList, logger, index))
  )
  //   logger.info(results)

  const combined: any = {}
  for (const result of results) {
    const keys = Object.keys(result)
    for (const key of keys) {
      const value = result[key]
      if (!combined[key]) {
        combined[key] = value
      } else {
        if (Array.isArray(value)) {
          // string array so concat
          combined[key] = combined[key].concat(value)
        } else {
          combined[key] += value
        }
      }
    }
  }

  logger.info("The results have been combined")
  return combined
  //   return results.reduce((combined: any, result: any) => {

  //   }, {})
}

export async function runEvaluation(
  list: string[],
  logger: Logger,
  executionNumber = 0
) {
  let invalid = 0
  const invalidQuestions: string[] = []
  let inaccurate = 0
  const inaccurateQuestions: string[] = []
  let valid = 0

  let count = 0

  for (const question of list) {
    logger.info(`Execution no. ${executionNumber} - Question no. ${count}`)
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

  return {
    total: list.length,
    invalid,
    inaccurate,
    correct: valid,
    invalidQuestions,
    inaccurateQuestions
  }
}
