import { Request, Response } from "express"
import { IRoute, requestTypes } from "../../IRoute.interface"

const name: string = `health-check`
const requestType: requestTypes = requestTypes.GET
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
  handler
}
