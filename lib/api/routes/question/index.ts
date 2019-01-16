import Router from "express-promise-router"

/* tslint:disable:no-var-requires */
const validate = require("express-validation")

import {
  handler as answerHandler,
  schema as answerSchema
} from "./answer.route"

const router = Router()

router.post("/answer", validate(answerSchema), answerHandler)

export default router
