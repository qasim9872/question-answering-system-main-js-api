import { Request, Response } from "express"
import * as Joi from "joi"
import { IRoute, requestTypes } from "../../IRoute.interface"

const name: string = `login`
const requestType: requestTypes = requestTypes.POST
const validationSchema = {
  body: {
    email: Joi.string()
      .email()
      .required(),
    password: Joi.string().required()
  }
}

const handler = async (req: Request, res: Response) => {
  res.status(200).json({
    user: {
      name: "Qasim"
    }
  })
}

export const endpoint: IRoute = {
  name,
  requestType,
  handler,
  validationSchema
}
