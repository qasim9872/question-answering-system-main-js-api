import { Document, Model, model, Schema } from "mongoose"
import IQuestion, { AnswerStatus } from "../interface/question.interface"
import Generator from "../utils/id-generator"

export interface IQuestionModel extends IQuestion, Document {
  // Meta data
  createdAt: Date
  updatedAt: Date
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

    askedBy: { type: Schema.Types.ObjectId, ref: "Question" },
    likes: { type: Number, default: 0 },
    dislikes: { type: Number, default: 0 },

    question: String,
    query: String,
    results: Array
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
