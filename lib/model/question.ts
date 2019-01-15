import { Document, Model, model, Schema } from "mongoose"
import IQuestion, { AnswerStatus } from "../interface/question.interface"
import Generator from "../utils/id-generator"

export interface IQuestionModel extends IQuestion, Document {
  // Meta data
  createdAt: Date
  updatedAt: Date

  // Additional data
  answerStatus: AnswerStatus
}

export const questionSchema: Schema = new Schema(
  {
    uniqueId: {
      type: String,
      unique: true,
      default: () => {
        return Generator()
      }
    },
    question: String,
    query: String,
    results: Array,
    answerStatus: {
      type: String,
      enum: [AnswerStatus.NOT_SET, AnswerStatus.GOOD, AnswerStatus.BAD],
      default: AnswerStatus.NOT_SET,
      required: true
    }
  },
  {
    timestamps: true
  }
)

const questionModel: Model<IQuestionModel> = model<IQuestionModel>(
  "Question",
  questionSchema
)

export default questionModel
