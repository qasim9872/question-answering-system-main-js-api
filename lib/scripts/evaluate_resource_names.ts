import { loadFileFromContent, runEvaluation } from "./helper"

import Logger from "../utils/logger"
const logger = Logger.getLogger(__filename)

function onlyUnique(value: string, index: number, self: string[]) {
  return self.indexOf(value) === index
}

function replaceNonEnglishChars(question: string) {
  question = question.toLowerCase()

  question = question.replace(/[çć]/g, "c")
  question = question.replace(/[šş]/g, "s")
  question = question.replace(/ğ/g, "g")

  question = question.replace(/ä/g, "a")
  question = question.replace(/é/g, "e")
  question = question.replace(/ı/g, "i")
  question = question.replace(/ö/g, "o")
  question = question.replace(/ü/g, "u")

  return question
}

function extractNames(list: string[], questionRegex: string[]) {
  const names = list.map((question) => {
    question = replaceNonEnglishChars(question)
    for (const regex of questionRegex) {
      const match = question.match(regex)
      if (match && match.length > 1) {
        return match[1]
      }
    }
    logger.info(`name not extracted from question: ${question}`)
    return ""
  })

  return names.filter((name) => Boolean(name)).filter(onlyUnique)
}

function createNewList(names: string[], questionTemplates: string[]) {
  const questionsArray = names.map((name) => {
    return replaceInTemplates(questionTemplates, name)
  })

  return questionsArray.reduce((array, questionArray) => {
    questionArray.forEach((question) => array.push(question))
    return array
  }, [])
}

function replaceInTemplates(questionTemplates: string[], replaceWith: string) {
  return questionTemplates.map((template) => {
    return template.toLowerCase().replace(/<.*>/, replaceWith)
  })
}

export async function evaluate() {
  const questionTemplates = await loadFileFromContent("template_questions.en")
  const extractNameRegex = `(.*)` // [a-z\\s]
  const questionRegex = replaceInTemplates(questionTemplates, extractNameRegex)

  const originalList = await loadFileFromContent("all_data.en")
  //   const originalList = await loadFileFromContent("dev_data.en")

  const names = extractNames(originalList, questionRegex)
  //   logger.info(names.length)
  const list = createNewList(names, questionTemplates)

  const result = await runEvaluation(list, logger, 1)
  logger.info(
    JSON.stringify(
      {
        total: result.total,
        invalid: result.invalid,
        inaccurate: result.inaccurate,
        correct: result.correct
      },
      null,
      2
    )
  )
}

evaluate()
