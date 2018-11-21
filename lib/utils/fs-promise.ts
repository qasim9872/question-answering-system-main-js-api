import * as fs from "fs"

export function readdirAsync(path: string): Promise<string[]> {
  return new Promise((resolve, reject) => {
    fs.readdir(path, (error, result) => {
      if (error) {
        reject(error)
      } else {
        resolve(result)
      }
    })
  })
}
