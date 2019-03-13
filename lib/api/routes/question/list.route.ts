import { Request, Response } from "express"
import { getList } from "../../../controller/question/list.controller"

/**
 * This route returns a list of questions that have been used to train the ml model
 * @route GET /question/list
 * @group Question - Processing questions
 * @returns {Array<object>} 200 - Question List
 * @returns {Error}  default - Unexpected error
 */
export async function handler(req: Request, res: Response) {
  const data = await getList()

  res.status(200).json(data)
}
