import { Request, Response } from "express"
import * as Joi from "joi"

import questionsHandler from "../../../controller/question/retrieve.controller"

export const schema = {
  body: {
    id: Joi.string()
  }
}

export async function handler(req: Request, res: Response) {
  const id = req.body.id

  const results = await questionsHandler(id)

  res.status(200).json(results)
}
