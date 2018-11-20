import { CustomError } from "ts-custom-error"
import { GenericCustomError } from "./generic-custom-error"

export class NotFoundError extends CustomError implements GenericCustomError {
  public code: number = 404

  public constructor(message?: string) {
    super(message)
  }
}
