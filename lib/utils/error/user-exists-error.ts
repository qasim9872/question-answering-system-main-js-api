import { CustomError } from "ts-custom-error"
import { GenericCustomError } from "./generic-custom-error"

export class UserExistsError extends CustomError implements GenericCustomError {
  public code: number = 409

  public constructor(message?: string) {
    super(message)
  }
}
