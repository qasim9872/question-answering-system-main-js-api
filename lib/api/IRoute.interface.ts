import { Request, Response } from "express"
import { Schema } from "joi"

type expressHandler = (req: Request, res: Response) => any

export interface JoiSchema {
  // Update this when adding schema for any of "body" | "params" | "query" | "headers" | "cookies"
  body: {
    [key: string]: Schema
  }
}

export const enum requestTypes {
  GET = "get",
  POST = "post"
}

export interface IRoute {
  name: string
  requestType: requestTypes
  handler: expressHandler
  validationSchema?: JoiSchema
}
