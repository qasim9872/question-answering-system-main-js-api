export async function saveSession(session: Express.Session) {
  return new Promise((resolve, reject) => {
    session.save((err) => {
      err ? reject(err) : resolve()
    })
  })
}
