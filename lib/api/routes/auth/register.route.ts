import { Request, Response } from "express"

export async function handler(req: Request, res: Response) {
  res.status(200).json({
    user: {
      name: "Qasim"
    }
  })
}
