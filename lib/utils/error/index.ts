import { NextFunction, Request, Response } from "express"

/* tslint:disable:no-var-requires */
const ev = require("express-validation")

import { CustomError } from "ts-custom-error"
import { NotFoundError } from "./not-found-error"

import Logger from "../logger"
import { GenericCustomError } from "./generic-custom-error"
const logger = Logger.getLogger("error-handler")

export function errorMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const err = new NotFoundError(`Resource Not Found: ${req.path}`)
  next(err)
}

function isCustomError(err: any): err is GenericCustomError {
  return err instanceof CustomError
}

export function errorHandler(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (err instanceof ev.ValidationError) {
    return res.status(err.status).json(err)
  } else if (isCustomError(err)) {
    return res.status(err.code).json(err)
  }

  logger.error(`unhandler error`, err)
  res.status(500).send(err)
}
