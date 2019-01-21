import { Request, Response } from "express"
import * as Joi from "joi"

import loginUserController from "../../../controller/auth/login.controller"

export const schema = {
  body: {
    email: Joi.string()
      .email()
      .required(),
    password: Joi.string().required()
  }
}

/**
 * This route validates the user credentials and generates a JWT token for the user
 * @route POST /auth/login
 * @group auth - Operations about user
 * @param {string} email.body.required - email - eg: test@user.com
 * @param {string} password.body.required - user's password. - eg: password
 * @returns {Object} 200 - User JWT token
 * @returns {Error}  default - Unexpected error
 */
export async function handler(req: Request, res: Response) {
  const user = req.user

  const token = loginUserController(user)

  res.status(200).json({ token })
}
