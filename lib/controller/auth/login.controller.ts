import * as jwt from "jsonwebtoken"
import { IUserModel } from "../../model/user"
import { appSecret } from "./../../config-details/server.config"

export default function genToken(user: IUserModel) {
  const payload = {
    id: user.id
  }
  return jwt.sign(payload, appSecret)
}
