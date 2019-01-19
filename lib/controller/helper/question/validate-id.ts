import Question from "../../../model/question"

export async function validate(id: string) {
  let question = null

  try {
    // validate question with the given id exists in database
    // error will be thrown if the given id is invalid
    question = await Question.findById(id)
  } catch (err) {
    return null
  }

  if (!question) {
    return null
  }

  const askedBy = question.askedBy

  // ensure that the question wasn't asked by anyone
  if (askedBy) {
    return null
  }

  return id
}

export default async function validateQuestionIds(ids: string[]) {
  const allIds = await Promise.all(ids.map(validate))

  const validIds = allIds.filter((id) => id !== null)
  return validIds ? validIds : []
}
