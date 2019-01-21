import Question from "../../../model/question"
import { IUserModel } from "../../../model/user"

export async function updateAsked(asked: string[], user: IUserModel) {
  return Promise.all(
    asked.map(async (questionId) => {
      try {
        const question = await Question.findById(questionId)

        if (question) {
          if (!question.askedBy) {
            question.askedBy = user.id
            await question.save()
          }
        }
        return question
      } catch (err) {
        // DO NOTHING
        return null
      }
    })
  )
}

export async function updateSingleLiked(liked: string, user: IUserModel) {
  return updateLiked([liked], user)
}

export async function updateLiked(liked: string[], user: IUserModel) {
  return Promise.all(
    liked.map(async (questionId) => {
      try {
        const question = await Question.findById(questionId)

        if (question) {
          // initialize if undefined
          if (!question.likedBy) {
            question.likedBy = []
          }
          if (question.likedBy) {
            // check user doesn't already like this question
            if (question.likedBy.indexOf(user.id) === -1) {
              question.likedBy.push(user.id)
              await question.save()
            }
          }
        }
        return question
      } catch (err) {
        // DO NOTHING
        return null
      }
    })
  )
}

export async function updateSingleDisliked(disliked: string, user: IUserModel) {
  return updateDisliked([disliked], user)
}

export async function updateDisliked(disliked: string[], user: IUserModel) {
  return Promise.all(
    disliked.map(async (questionId) => {
      try {
        const question = await Question.findById(questionId)

        if (question) {
          // initialize if undefined
          if (!question.dislikedBy) {
            question.dislikedBy = []
          }
          if (question.dislikedBy) {
            // check user doesn't already like this question
            if (question.dislikedBy.indexOf(user.id) === -1) {
              question.dislikedBy.push(user.id)
              await question.save()
            }
          }
        }
        return question
      } catch (err) {
        // DO NOTHING
        return null
      }
    })
  )
}

/**
 * @description retrieves the data from the session and
 * updates relevant questions with the new user id
 * @param session
 * @param user
 */
export async function findAndUpdateQuestions(
  session: Express.Session,
  user: IUserModel
) {
  const asked = session.asked || []

  await updateAsked(asked, user)
}
