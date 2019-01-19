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

export async function handler(req: Request, res: Response) {
  const user = req.user

  const token = loginUserController(user)

  res.status(200).json({ token })
}
