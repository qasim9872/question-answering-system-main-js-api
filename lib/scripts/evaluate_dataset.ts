import { loadFileFromContent, runEvaluationInParallel } from "./helper"

import Logger from "../utils/logger"
const logger = Logger.getLogger(__filename)

export async function evaluate() {
  const list = await loadFileFromContent("all_data.en")

  const result = await runEvaluationInParallel(list, logger)
  logger.info(JSON.stringify(result, null, 2))
}

evaluate()
