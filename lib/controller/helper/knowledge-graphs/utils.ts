/* tslint:disable-next-line:no-var-requires */
const dps = require("dbpedia-sparql-client").default

export function dbPediaResults(query: string) {
  return dps
    .client()
    .query(query)
    .asJson()
}
