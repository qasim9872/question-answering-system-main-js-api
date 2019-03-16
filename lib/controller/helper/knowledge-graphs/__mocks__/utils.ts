import { dbPediaMockServerData } from "../../../../setup/test-utils/dbpedia.response"

export function dbPediaResults(query: string) {
  const pair = dbPediaMockServerData.find((dataPair) => {
    return query.includes(dataPair.query)
  })
  if (pair) {
    return Promise.resolve(pair.response)
  } else {
    return Promise.reject()
  }
}
