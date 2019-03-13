import { Request, Response } from "express"
import * as Joi from "joi"

import retrieveQuestionsController from "../../../controller/question/retrieve.controller"

export const schema = {
  body: {
    id: Joi.string(),
    offset: Joi.number(),
    fetch: Joi.number()
  }
}

/**
 * @typedef answerPostBody
 * @property {string} id - The id of the question
 * @property {string} offset - The offset of the results
 * @property {string} fetch - The number of elements to return
 */

/**
 * This route processes returns the answers. This can either be done using a
 * specific id by passing that in the body or by passing an offset and fetch value
 * in which case the results can be paginated
 * @route POST /question/retrieve
 * @group Question - Processing questions
 * @param {answerPostBody.model} answerPostBody.body.required - check model for detailed information
 * @returns {Array<object>} 200 - The resulting answer objects
 * @returns {Error}  default - Unexpected error
 */
export async function handler(req: Request, res: Response) {
  const id: string = req.body.id
  const offset: number = req.body.offset || 0
  const fetch: number = req.body.fetch

  const results = await retrieveQuestionsController(id, offset, fetch)

  res.status(200).json(results)
}
