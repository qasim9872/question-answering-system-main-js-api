import { Request, Response } from "express"

export async function handler(req: Request, res: Response) {
  res.status(200).json({
    api_version: `v1`,
    endpoint_name: `health-check`,
    app_name: `final year project app`
  })
}
