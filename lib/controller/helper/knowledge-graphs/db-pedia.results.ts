import IResult from "../../../interface/result.interface"
/* tslint:disable:no-var-requires */
const dps = require("dbpedia-sparql-client").default
/* tslint:disable:no-var-requires */

export function getInvalidQueryResponse(): IResult[] {
  return [
    {
      source: "Server",
      varName: "anonymous",
      lang: "en",
      value: [
        "The extraction from DBpedia failed",
        "This is possibly due to the generated query being invalid"
      ].join("\n")
    }
  ]
}

export function dbPediaResults(query: string) {
  return dps
    .client()
    .query(query)
    .asJson()
}

export function extractResult(resultObj: any) {
  const result: IResult[] = []
  const bindings: [] = resultObj.results.bindings

  bindings.forEach((binding: any) => {
    Object.keys(binding).forEach((key: string) => {
      const data = binding[key]
      result.push({
        source: "DBPedia",
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
  try {
    const dbPediaResult = await dbPediaResults(query)

    return extractResult(dbPediaResult)
  } catch (err) {
    return getInvalidQueryResponse()
  }
}
