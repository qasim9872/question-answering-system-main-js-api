import * as bcrypt from "bcrypt-nodejs"
import { Document, Model, model, Schema } from "mongoose"
import IUser from "../interface/user.interface"

export interface IUserModel extends IUser, Document {
  // Meta data
  createdAt: Date
  updatedAt: Date
}

export const userSchema: Schema = new Schema(
  {
    name: String,
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    image: String,

    asked: [{ type: Schema.Types.ObjectId, ref: "Question" }],
    liked: [{ type: Schema.Types.ObjectId, ref: "Question" }],
    disliked: [{ type: Schema.Types.ObjectId, ref: "Question" }]
  },
  {
    timestamps: true
  }
)

/**
 * Password hash middleware.
 */
userSchema.pre("save", function save(this: IUserModel, next) {
  if (!this.isModified("password")) {
    return next()
  }

  bcrypt.genSalt(10, (error, salt) => {
    if (error) {
      return next(error)
    }

    /* tslint:disable:no-empty */
    bcrypt.hash(
      this.password,
      salt,
      () => {},
      (err, hash) => {
        if (err) {
          return next(err)
        }

        this.password = hash
        next()
      }
    )
  })
})

/**
 * Helper method for validating user's password.
 */
userSchema.methods.comparePassword = function comparePassword(
  candidatePassword: string,
  callBack: (err: Error, isMatch: boolean) => any
) {
  bcrypt.compare(candidatePassword, this.password, (err, isMatch: boolean) => {
    callBack(err, isMatch)
  })
}

const userModel: Model<IUserModel> = model<IUserModel>("User", userSchema)

export default userModel
