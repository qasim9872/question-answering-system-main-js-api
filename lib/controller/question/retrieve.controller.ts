import QuestionModel from "../../model/question"

export async function getQuestionsByParams(params: any) {
  return QuestionModel.find({ ...params }).sort("-updatedAt")
}

export default async function getQuestions(id: string) {
  const results = await (id
    ? getQuestionsByParams({ _id: id })
    : getQuestionsByParams({}))

  return results.length === 1 ? results[0] : results
}
