import { Schema } from "mongoose"

export default interface IUser {
  name: string
  email: string
  password: string

  asked: Schema.Types.ObjectId[]
  liked: Schema.Types.ObjectId[]
  disliked: Schema.Types.ObjectId[]
}
