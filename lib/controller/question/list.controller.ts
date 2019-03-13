import { join } from "path"
import { readFile } from "../../utils/file-system"

async function loadList() {
  const pathToQuestionList = join(
    __dirname,
    "..",
    "..",
    "content",
    "training_data.en"
  )

  const data: string = (await readFile(pathToQuestionList)) as any

  // split lines
  const lines = data.split("\n")

  return lines
}

// Cache the list at the boot up
const list = loadList()

export async function getList() {
  return list
}
