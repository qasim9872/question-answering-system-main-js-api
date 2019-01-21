import QuestionModel from "../../model/question"

export async function getQuestionsByParams(
  params: any,
  alwaysReturnArray = false
) {
  const results = await QuestionModel.find({ ...params }).sort("-createdAt")
  return alwaysReturnArray
    ? results
    : results.length === 1
    ? results[0]
    : results
}

export async function paginateQuestions(offset: number, limit: number = 50) {
  const result = await QuestionModel.paginate(
    {},
    {
      sort: { createdAt: -1 },
      populate: ["askedBy", "likedBy", "dislikedBy"],
      offset,
      lean: true,
      limit
    }
  )
  return result.docs
}

export default async function getQuestions(
  id: string,
  offset: number,
  fetch: number
) {
  const results = await (id
    ? getQuestionsByParams({ _id: id })
    : paginateQuestions(offset, fetch))

  return results
}
