import { Request, Response } from "express"
import * as Joi from "joi"
import { IRoute, requestTypes } from "../../IRoute.interface"

const name: string = `question`
const requestType: requestTypes = requestTypes.POST
const validationSchema = {
  body: {
    question: Joi.string().required()
  }
}

const handler = async (req: Request, res: Response) => {
  res.status(200).json({
    api_version: `v1`,
    endpoint_name: name,
    app_name: `final year project app`
  })
}

export const endpoint: IRoute = {
  name,
  requestType,
  handler,
  validationSchema
}
