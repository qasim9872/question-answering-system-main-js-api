import { Request, Response } from "express"
import * as Joi from "joi"

import questionController from "../../../controller/question/answer.controller"

export const schema = {
  body: {
    question: Joi.string().required()
  }
}

export async function handler(req: Request, res: Response) {
  const question = req.body.question

  const answer = await questionController(question)

  res.status(200).json(answer)
}
