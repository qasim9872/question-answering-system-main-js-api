import { Request, Response } from "express"
import * as Joi from "joi"

import dislike from "../../../controller/question/dislike.controller"
import { IUserModel } from "../../../model/user"

export const schema = {
  body: {
    question: Joi.string().required()
  }
}
/**
 * @typedef dislikeBody
 * @property {string} question.required - The id of the question to dislike
 */

/**
 * This route updates the answer object and adds the user as someone who dislikes the answer
 * @route POST /question/dislike
 * @group Question - Processing questions
 * @param {dislikeBody.model} dislikeBody.body.required - check model for detailed information
 * @returns {object} 200 - Updated answer object
 * @returns {Error}  default - Unexpected error
 * @security JWT
 */
export async function handler(req: Request, res: Response) {
  const user: IUserModel = req.user
  const questionId = req.body.question

  const updated = await dislike(user, questionId)

  res.status(200).json(updated)
}
