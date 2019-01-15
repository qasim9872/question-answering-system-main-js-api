import { Request, Response } from "express"
import * as Joi from "joi"
import { IRoute, requestTypes } from "../../IRoute.interface"

import questionHandler from "../../../controller/question"

const name: string = `question`
const requestType: requestTypes = requestTypes.POST
const validationSchema = {
  body: {
    question: Joi.string().required()
  }
}

const handler = async (req: Request, res: Response) => {
  const question = req.body.question

  const answer = await questionHandler(question)

  res.status(200).json(answer)
}

export const endpoint: IRoute = {
  name,
  requestType,
  handler,
  validationSchema
}
