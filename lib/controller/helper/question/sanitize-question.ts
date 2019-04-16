const ENDING_CHARACTERS = ["?", ".", "!"]

export function checkEnding(str: string) {
  ENDING_CHARACTERS.forEach((character) => {
    if (str.endsWith(character)) {
      return true
    }
  })

  return false
}

export default function sanitize(question: string) {
  // TO-DO - remove special characters

  // lower case question
  question = question.toLowerCase()

  // Ensure the question ends with one of the ending characters
  if (!checkEnding(question)) {
    // Add an ending character if it does not
    question = question + ENDING_CHARACTERS[0]
  }

  return question
}
