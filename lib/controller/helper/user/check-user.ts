import userModel from "../../../model/user"
import { UserExistsError } from "../../../utils/error/user-exists-error"

export default async function userExists(email: string) {
  const user = await userModel.findOne({ email })
  if (user) {
    throw new UserExistsError(`User with email: ${email} already exists`)
  }
}
