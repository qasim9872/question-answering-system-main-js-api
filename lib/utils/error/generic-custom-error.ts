import { CustomError } from "ts-custom-error"

export interface GenericCustomError extends CustomError {
  code: number
}
