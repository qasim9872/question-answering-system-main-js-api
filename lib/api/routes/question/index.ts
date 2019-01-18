import Router from "express-promise-router"

/* tslint:disable:no-var-requires */
const validate = require("express-validation")

import {
  handler as answerHandler,
  schema as answerSchema
} from "./answer.route"
import {
  handler as retrieveHandler,
  schema as retrieveSchema
} from "./retrieve.route"

const router = Router()

router.post("/answer", validate(answerSchema), answerHandler)
router.post("/retrieve", validate(retrieveSchema), retrieveHandler)

export default router
