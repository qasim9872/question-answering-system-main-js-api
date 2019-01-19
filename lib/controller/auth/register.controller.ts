import UserModel from "../../model/user"
import validateQuestionIds from "../helper/question/validate-id"
import checkUserExists from "../helper/user/check-user"

import Logger from "../../utils/logger"
const logger = Logger.getLogger(__filename)

export function getAvatarUrl(name: string) {
  return `https://api.adorable.io/avatars/${encodeURI(name)}.png`
}

export default async function registerUser(
  name: string,
  email: string,
  password: string,
  previouslyAsked: string[] = []
) {
  const asked = await validateQuestionIds(previouslyAsked)

  await checkUserExists(email)

  const user = await UserModel.create({
    name,
    email,
    password,
    asked,
    // add default avatar
    image: getAvatarUrl(name)
  })

  return user
}
