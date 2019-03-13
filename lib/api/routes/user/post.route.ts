import { Request, Response } from "express"
import * as Joi from "joi"
import registerUserController from "../../../controller/auth/register.controller"

export const schema = {
  body: {
    name: Joi.string().required(),
    username: Joi.string().required(),
    email: Joi.string()
      .email()
      .required(),
    password: Joi.string().required()
  }
}

/**
 * @typedef userPostBody
 * @property {string} name.required - name
 * @property {string} username.required - username
 * @property {string} email.required - email
 * @property {string} password.required - user's password.
 */

/**
 * This route registers a new user using the data provided. The session data is also migrated
 * @route POST /user
 * @group user - Operations about user
 * @param {userPostBody.model} userPostBody.body.required - check model for detailed information
 * @returns {null} 201 - User object created
 * @returns {Error}  default - Unexpected error
 */
export async function handler(req: Request, res: Response) {
  const { name, username, email, password } = req.body

  const session = req.session || null

  // lowercase username & email
  await registerUserController(
    name,
    username.toLowerCase(),
    email.toLowerCase(),
    password,
    session
  )

  res.sendStatus(201)
}
