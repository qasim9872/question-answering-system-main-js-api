import { Request, Response } from "express"
import * as Joi from "joi"
import { IUserModel } from "../../../model/user"

export const schema = {
  body: {
    image: Joi.string()
      .uri()
      .allow("")
      .optional(),
    bio: Joi.string()
      .allow("")
      .optional(),
    password: Joi.string()
      .allow("")
      .optional()
  }
}

/**
 * @typedef userPutBody
 * @property {string} image - image
 * @property {string} bio - bio
 * @property {string} password - user's password.
 */

/**
 * This route can update user data
 * @route Put /user
 * @group user - Operations about user
 * @param {userPutBody.model} userPutBody.body - check model for detailed information
 * @security JWT
 * @returns {Object} 200 - Update successful
 * @returns {Error}  default - Unexpected error
 */
export async function handler(req: Request, res: Response) {
  const user: IUserModel = req.user
  const { image, bio, password } = req.body

  let updated = false
  if (image && image !== user.image) {
    user.image = image
    updated = true
  }

  // Allow setting to empty string
  if (bio !== user.bio) {
    user.bio = bio
    updated = true
  }

  if (password) {
    user.password = password
    updated = true
  }

  if (updated) {
    await user.save()
  }

  res.sendStatus(200)
}
