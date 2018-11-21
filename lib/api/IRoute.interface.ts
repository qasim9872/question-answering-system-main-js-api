import { Request, Response } from "express"

type expressHandler = (req: Request, res: Response) => any

export const enum requestTypes {
  GET = "get",
  POST = "post"
}

export interface IRoute {
  name: string
  requestType: requestTypes
  handler: expressHandler
  validationSchema?: JSON
}
