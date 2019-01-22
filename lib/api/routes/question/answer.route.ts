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
  const session = req.session || null
  const question = req.body.question

  const answerId = await questionController(user, session, question)

  res.status(201).json({
    id: answerId
  })
}
