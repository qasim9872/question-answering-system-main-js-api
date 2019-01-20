import { Schema } from "mongoose"

export default interface IUser {
  name: string
  username: string
  email: string
  password: string
  image: string

  asked: Schema.Types.ObjectId[]
  liked: Schema.Types.ObjectId[]
  disliked: Schema.Types.ObjectId[]
}
