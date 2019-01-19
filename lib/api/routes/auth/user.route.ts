import { Request, Response } from "express"
import { IUserModel } from "../../../model/user"

export async function handler(req: Request, res: Response) {
  const user = req.user

  const data = user.toObject()
  delete data.password

  res.status(200).json(data)
}
