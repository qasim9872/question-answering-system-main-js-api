import { Request, Response } from "express"
import * as Joi from "joi"

import like from "../../../controller/question/like.controller"
import { IUserModel } from "../../../model/user"

export const schema = {
  body: {
    question: Joi.string().required()
  }
}

/**
 * @typedef likeBody
 * @property {string} question.required - The id of the question to like
 */

/**
 * This route updates the answer object and adds the user as someone who likes the answer
 * @route POST /question/like
 * @group Question - Processing questions
 * @param {likeBody.model} likeBody.body.required - check model for detailed information
 * @returns {object} 200 - Updated answer object
 * @returns {Error}  default - Unexpected error
 * @security JWT
 */
export async function handler(req: Request, res: Response) {
  const user: IUserModel = req.user
  const questionId = req.body.question

  const updated = await like(user, questionId)

  res.status(200).json(updated)
}
