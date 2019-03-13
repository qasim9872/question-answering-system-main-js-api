import { Request, Response } from "express"
import * as Joi from "joi"

import questionController from "../../../controller/question/answer.controller"
import { IUserModel } from "../../../model/user"

export const schema = {
  body: {
    question: Joi.string().required()
  }
}

/**
 * @typedef answerPostBody
 * @property {string} question.required - The question being asked
 */

/**
 * This route processes the given question string and
 * returns the id of the newly created answer object
 * @route POST /question/answer
 * @group Question - Processing questions
 * @param {answerPostBody.model} answerPostBody.body.required - check model for detailed information
 * @returns {string} 201 - Answer object created
 * @returns {Error}  default - Unexpected error
 */
export async function handler(req: Request, res: Response) {
  const user: IUserModel = req.user
  const session = req.session || null
  const question = req.body.question

  const answerId = await questionController(user, session, question)

  res.status(201).json({
    id: answerId
  })
}
