import Question from "../../model/question"
import { IUserModel } from "../../model/user"

export default async function dislike(user: IUserModel, questionId: string) {
  const question = await Question.findById(questionId)

  if (question) {
    if (user) {
      if (!question.dislikedBy) {
        // initialize empty array
        question.dislikedBy = []
      }
      // check if user already liked this question
      if (question.likedBy && question.likedBy.indexOf(user.id) > -1) {
        const index = question.likedBy.indexOf(user.id)
        question.likedBy.splice(index, 1)
      }
      // check user doesn't already dislikes this question
      if (question.dislikedBy.indexOf(user.id) === -1) {
        question.dislikedBy.push(user.id)
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
