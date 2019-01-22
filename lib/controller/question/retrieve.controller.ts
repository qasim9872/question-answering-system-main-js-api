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

export async function paginateQuestions(
  id: string,
  offset: number = 0,
  limit: number = 50
) {
  const params = id
    ? {
        _id: id
      }
    : {}

  const result = await QuestionModel.paginate(params, {
    sort: { createdAt: -1 },
    populate: ["askedBy", "likedBy", "dislikedBy"],
    // set offset to 0 if id is present
    offset: id ? 0 : offset,
    lean: true,
    limit
  })

  return result.docs
}

export default async function getQuestions(
  id: string,
  offset: number,
  fetch: number
) {
  const results = await paginateQuestions(id, offset, fetch)

  return results
}
