import * as fs from "fs"

export async function readFile(filePath: string) {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, "utf8", (err, data) => {
      err ? reject(err) : resolve(data)
    })
  })
}
