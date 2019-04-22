import Router from "express-promise-router"

/* tslint:disable:no-var-requires */
const validate = require("express-validation")

import {
  isAuthenticated,
  isAuthenticatedOrAnonymous
} from "../../../setup/passport"

import {
  handler as answerHandler,
  schema as answerSchema
} from "./answer.route"
import {
  handler as dislikeHandler,
  schema as dislikeSchema
} from "./dislike.route"
import { handler as evaluateHandler } from "./evaluate.route"
import { handler as likeHandler, schema as likeSchema } from "./like.route"
import { handler as listHandler } from "./list.route"
import {
  handler as retrieveHandler,
  schema as retrieveSchema
} from "./retrieve.route"
import { handler as statsHandler } from "./stats.route"

const router = Router()

router.post(
  "/answer",
  validate(answerSchema),
  isAuthenticatedOrAnonymous(),
  answerHandler
)
router.post(
  "/dislike",
  validate(dislikeSchema),
  isAuthenticated(),
  dislikeHandler
)
router.post("/like", validate(likeSchema), isAuthenticated(), likeHandler)
router.post("/retrieve", validate(retrieveSchema), retrieveHandler)
router.post("/evaluate", evaluateHandler)

router.get("/list", listHandler)
router.get("/stats", statsHandler)

export default router
