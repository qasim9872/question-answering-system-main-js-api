/* tslint:disable:no-var-requires */
const dps = require("dbpedia-sparql-client").default
/* tslint:disable:no-var-requires */

export function dbPediaResults(query: string) {
  return dps
    .client()
    .query(query)
    .asJson()
}

export interface IResult {
  varName: string
  lang: string
  value: string
}

export function extractResult(resultObj: any) {
  const result: IResult[] = []
  const bindings: [] = resultObj.results.bindings

  bindings.forEach((binding: any) => {
    Object.keys(binding).forEach((key: string) => {
      const data = binding[key]
      result.push({
        varName: key,
        lang: data["xml:lang"],
        value: data.value
      })
    })
  })

  // Only return the result which is in english
  return result.filter((val) => val.lang === "en")
}

export default async function(query: string) {
  const dbPediaResult = await dbPediaResults(query)

  return {
    dbPedia: extractResult(dbPediaResult)
  }
}
