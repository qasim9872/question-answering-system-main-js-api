import { Request, Response } from "express"
import * as Joi from "joi"

import retrieveQuestionsController from "../../../controller/question/retrieve.controller"

export const schema = {
  body: {
    id: Joi.string(),
    offset: Joi.number()
  }
}

export async function handler(req: Request, res: Response) {
  const id: string = req.body.id
  const offset: number = req.body.offset || 0

  const results = await retrieveQuestionsController(id, offset)

  res.status(200).json(results)
}
