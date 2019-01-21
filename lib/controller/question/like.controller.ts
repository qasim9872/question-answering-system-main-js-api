import Question from "../../model/question"
import { IUserModel } from "../../model/user"

export default async function like(user: IUserModel, questionId: string) {
  const question = await Question.findById(questionId)

  if (question) {
    if (user) {
      if (!question.likedBy) {
        // initialize empty array
        question.likedBy = []
      }
      // check if user already disliked this question
      if (question.dislikedBy && question.dislikedBy.indexOf(user.id) > -1) {
        const index = question.dislikedBy.indexOf(user.id)
        question.dislikedBy.splice(index, 1)
      }
      // check user doesn't already like this question
      if (question.likedBy.indexOf(user.id) === -1) {
        question.likedBy.push(user.id)
      }
      await question.save()
    }

    const updated = await question
      .populate("askedBy")
      .populate("likedBy")
      .populate("dislikedBy")
      .execPopulate()

    return updated
  } else {
    // No question found with the given id
    return null
  }
}
