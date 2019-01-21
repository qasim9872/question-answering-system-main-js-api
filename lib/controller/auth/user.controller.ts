import Question from "../../model/question"
import { IUserModel } from "../../model/user"
import { getQuestionsByParams } from "../question/retrieve.controller"

function getArrayOfQueries(id: string) {
  return [
    getQuestionsByParams({ askedBy: id }, true),
    getQuestionsByParams({ likedBy: id }, true),
    getQuestionsByParams({ dislikedBy: id }, true)
  ]
}

function sanitizeUserResponse(user: IUserModel) {
  const userObj = user.toObject()
  delete userObj.password
  return userObj
}

export async function getUserData(user: IUserModel) {
  const id = user.id

  const result = await Promise.all(getArrayOfQueries(id))
  const sanitizedUser = sanitizeUserResponse(user)

  return {
    ...sanitizedUser,
    asked: result[0],
    likes: result[1],
    dislikes: result[2]
  }
}
