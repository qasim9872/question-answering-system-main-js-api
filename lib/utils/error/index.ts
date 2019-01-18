import { NextFunction, Request, Response } from "express"
import Logger from "../logger"
import { GenericCustomError } from "./generic-custom-error"
import { NotFoundError } from "./not-found-error"

const logger = Logger.getLogger("error-handler")

export function errorMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const err = new NotFoundError(`Resource Not Found: ${req.path}`)
  next(err)
}

export function errorHandler(
  err: GenericCustomError,
  req: Request,
  res: Response,
  next: NextFunction
) {
  logger.error(err)
  res.status(err.code || 500).send(err)
}
