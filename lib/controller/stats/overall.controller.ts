import * as _ from "lodash"

import { IQuestionModel } from "../../model/question"
import { getQuestionsByParams } from "../question/retrieve.controller"

export async function fetchOverallStats() {
  const totalQuestions = await getQuestionsByParams({}, true)

  if (!Array.isArray(totalQuestions)) {
    throw new Error("total questions should return an array")
  }

  const questionStats = await fetchQuestionStats(totalQuestions)
  const chartData = await computeTimeline(totalQuestions)

  return {
    ...questionStats,
    ...chartData
  }
}

export async function computeTimeline(totalQuestions: IQuestionModel[]) {
  const timeGroups = _.groupBy(totalQuestions, (element) => {
    return element.createdAt.toDateString()
  })

  const timeline = Object.keys(timeGroups).reduce((data: any, timeGroupTag) => {
    const timeGroupCount = timeGroups[timeGroupTag].length

    data[timeGroupTag] = timeGroupCount
    return data
  }, {})

  return { timeline }
}

export async function fetchQuestionStats(totalQuestions: IQuestionModel[]) {
  // total number of questions
  const totalQuestionsLength = totalQuestions.length

  // total failed questions
  const failedQuestions = await getQuestionsByParams(
    {
      "results.source": "Server"
    },
    true
  )

  const failedQuestionsLength = Array.isArray(failedQuestions)
    ? failedQuestions.length
    : 1

  // total successful questions
  const successfulQuestionsLength = totalQuestionsLength - failedQuestionsLength

  return {
    total: totalQuestionsLength,
    failed: failedQuestionsLength,
    successful: successfulQuestionsLength
  }
}
