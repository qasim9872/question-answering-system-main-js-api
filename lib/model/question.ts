import { Document, model, PaginateModel, Schema } from "mongoose"
import * as mongoosePaginate from "mongoose-paginate"
import IQuestion from "../interface/question.interface"
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

    askedBy: { type: Schema.Types.ObjectId, ref: "User" },
    likedBy: [{ type: Schema.Types.ObjectId, ref: "User" }],
    dislikedBy: [{ type: Schema.Types.ObjectId, ref: "User" }],

    question: String,
    query: String,
    results: Array
  },
  {
    timestamps: true
  }
)

questionSchema.plugin(mongoosePaginate)

const questionModel: PaginateModel<IQuestionModel> = model<IQuestionModel>(
  "Question",
  questionSchema
)

export default questionModel
