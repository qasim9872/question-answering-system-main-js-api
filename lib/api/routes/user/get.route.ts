import { Request, Response } from "express"
import { getUserData } from "../../../controller/auth/user.controller"
import { IUserModel } from "../../../model/user"

/**
 * This route returns the data for the current user
 * @route GET /user
 * @group user - Operations about user
 * @returns {Object} 200 - User Data
 * @returns {Error}  default - Unexpected error
 * @security JWT
 */
export async function handler(req: Request, res: Response) {
  const user: IUserModel = req.user

  const data = await getUserData(user)

  res.status(200).json(data)
}
