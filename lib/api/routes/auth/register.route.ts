import { Request, Response } from "express"
import * as Joi from "joi"
import registerUserController from "../../../controller/auth/register.controller"

export const schema = {
  body: {
    name: Joi.string().required(),
    email: Joi.string()
      .email()
      .required(),
    password: Joi.string().required(),
    previouslyAsked: Joi.array()
  }
}

export async function handler(req: Request, res: Response) {
  const { name, email, password, previouslyAsked } = req.body

  // lowercase email
  await registerUserController(
    name,
    email.toLowerCase(),
    password,
    previouslyAsked
  )

  res.sendStatus(201)
}
