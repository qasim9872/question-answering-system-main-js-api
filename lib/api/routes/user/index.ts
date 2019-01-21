import Router from "express-promise-router"

/* tslint:disable:no-var-requires */
const validate = require("express-validation")

import { isAuthenticated } from "../../../setup/passport"

import { handler as getUserHandler } from "./get.route"
import {
  handler as newUserHandler,
  schema as newUserSchema
} from "./post.route"
import {
  handler as updateUserHandler,
  schema as updateUserSchema
} from "./put.route"

const router = Router()

router.get("/", isAuthenticated(), getUserHandler)
router.put(
  "/",
  isAuthenticated(),
  validate(updateUserSchema),
  updateUserHandler
)
router.post("/", validate(newUserSchema), newUserHandler)

export default router
