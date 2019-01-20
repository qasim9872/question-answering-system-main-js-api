import { Request, Response } from "express"
import { IUserModel } from "../../../model/user"

export async function handler(req: Request, res: Response) {
  const user: IUserModel = req.user

  const updated = await user
    .populate("asked")
    .populate("liked")
    .populate("disliked")
    .execPopulate()

  const data = updated.toObject()
  delete data.password

  res.status(200).json(data)
}
