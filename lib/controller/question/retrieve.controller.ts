import QuestionModel from "../../model/question"

export async function getQuestionsByParams(params: any) {
  const results = await QuestionModel.find({ ...params }).sort("-updatedAt")
  return results.length === 1 ? results[0] : results
}

export async function paginateQuestions(offset: number) {
  const result = await QuestionModel.paginate(
    {},
    {
      sort: { updatedAt: -1 },
      offset,
      lean: true,
      limit: 50
    }
  )
  return result.docs
}

export default async function getQuestions(id: string, offset: number) {
  const results = await (id
    ? getQuestionsByParams({ _id: id })
    : paginateQuestions(offset))

  return results
}
