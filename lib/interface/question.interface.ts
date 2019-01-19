import { Schema } from "mongoose"
import IResult from "./result.interface"

export const enum AnswerStatus {
  NOT_SET = "not_set",
  GOOD = "good",
  BAD = "bad"
}

export default interface IQuestion {
  // meta
  askedBy?: Schema.Types.ObjectId
  likes?: number
  dislikes?: number

  // data
  question: string
  query: string
  results: IResult[]
}
