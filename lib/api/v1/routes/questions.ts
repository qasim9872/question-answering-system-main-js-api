import { Request, Response } from "express"
import * as Joi from "joi"
import { IRoute, requestTypes } from "../../IRoute.interface"

import questionsHandler from "../../../controller/questions"

const name: string = `questions`
const requestType: requestTypes = requestTypes.POST
const validationSchema = {
  body: {
    id: Joi.string()
  }
}

const handler = async (req: Request, res: Response) => {
  const id = req.body.id

  const results = await questionsHandler(id)

  res.status(200).json(results)
}

export const endpoint: IRoute = {
  name,
  requestType,
  handler,
  validationSchema
}
