import { Request, Response } from "express"
import { fetchOverallStats } from "../../../controller/stats/overall.controller"

/**
 * This route calculates and returns the overall statistics
 * @route GET /stats
 * @group stats - Operations about statistics
 * @returns {Object} 200 - Stats
 * @returns {Error}  default - Unexpected error
 */
export async function handler(req: Request, res: Response) {
  const data = await fetchOverallStats()

  res.status(200).json(data)
}
