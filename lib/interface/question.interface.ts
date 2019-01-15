import IResult from "./result.interface"

export const enum AnswerStatus {
  NOT_SET = "not_set",
  GOOD = "good",
  BAD = "bad"
}

export default interface IQuestion {
  // data
  question: string
  query: string
  results: IResult[]
}
