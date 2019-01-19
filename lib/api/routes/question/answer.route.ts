import { Request, Response } from "express"
import * as Joi from "joi"

import questionController from "../../../controller/question/answer.controller"
import { IUserModel } from "../../../model/user"

export const schema = {
  body: {
    question: Joi.string().required()
  }
}

export async function handler(req: Request, res: Response) {
  const user: IUserModel = req.user
  const question = req.body.question

  const answer = await questionController(user, question)

  res.status(200).json(answer)
}
