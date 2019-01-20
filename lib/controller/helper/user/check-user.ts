import userModel from "../../../model/user"
import { UserExistsError } from "../../../utils/error/user-exists-error"

async function checkEmail(email: string) {
  const user = await userModel.findOne({ email })
  if (user) {
    throw new UserExistsError(`User with email: ${email} already exists`)
  }
}

async function checkUsername(username: string) {
  const user = await userModel.findOne({ username })
  if (user) {
    throw new UserExistsError(`User with username: ${username} already exists`)
  }
}

export default async function userExists(email: string, username: string) {
  await Promise.all([checkEmail(email), checkUsername(username)])
}
