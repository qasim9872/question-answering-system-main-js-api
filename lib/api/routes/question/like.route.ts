import { Request, Response } from "express"
import * as Joi from "joi"

import like from "../../../controller/question/like.controller"
import { IUserModel } from "../../../model/user"

export const schema = {
  body: {
    question: Joi.string().required()
  }
}

export async function handler(req: Request, res: Response) {
  const user: IUserModel = req.user
  const questionId = req.body.question

  const updated = await like(user, questionId)

  res.status(200).json(updated)
}
