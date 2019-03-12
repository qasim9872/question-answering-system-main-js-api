import { Request, Response } from "express"
import { getUserData } from "../../../controller/auth/user.controller"
import UserModel from "../../../model/user"

/**
 * This route returns the data for the user with the given username
 * @route GET /users/{username}
 * @group users - Operations about users
 * @param {string} username.path.required - The username of the user being looked up
 * @returns {Object} 200 - User Data
 * @returns {Error}  default - Unexpected error
 */
export async function handler(req: Request, res: Response) {
  const { username } = req.params

  const user = await UserModel.findOne({ username })

  if (user) {
    const data = await getUserData(user)

    return res.status(200).json(data)
  } else {
    return res.sendStatus(404)
  }
}
