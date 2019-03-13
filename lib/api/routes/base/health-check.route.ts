import { Request, Response } from "express"

/**
 * This route always returns 200 - healthcheck
 * @route GET /health-check
 * @group General - General endpoints
 * @returns {Object} 200 - Application data
 * @returns {Error}  default - Unexpected error
 */
export async function handler(req: Request, res: Response) {
  res.status(200).json({
    api_version: `v1`,
    endpoint_name: `health-check`,
    app_name: `final year project app`
  })
}
