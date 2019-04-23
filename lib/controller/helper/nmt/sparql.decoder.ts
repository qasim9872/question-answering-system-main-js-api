// Code taken from https://github.com/AKSW/NSpM/blob/master/generator_utils.py

const REPLACEMENTS = [
  ["dbo:", "http://dbpedia.org/ontology/", "dbo_"],
  ["dbp:", "http://dbpedia.org/property/", "dbp_"],
  ["dbc:", "http://dbpedia.org/resource/Category:", "dbc_"],
  ["dbr:", "res:", "http://dbpedia.org/resource/", "dbr_"],
  ["dct:", "dct_"],
  ["geo:", "geo_"],
  ["georss:", "georss_"],
  ["rdf:", "rdf_"],
  ["rdfs:", "rdfs_"],
  ["foaf:", "foaf_"],
  ["owl:", "owl_"],
  ["yago:", "yago_"],
  ["skos:", "skos_"],
  [" ( ", "  par_open  "],
  [" ) ", "  par_close  "],
  ["(", " attr_open "],
  [") ", ")", " attr_close "],
  ["{", " brack_open "],
  ["}", " brack_close "],
  [" . ", " sep_dot "],
  [". ", " sep_dot "],
  ["?", "var_"],
  ["*", "wildcard"],
  [" <= ", " math_leq "],
  [" >= ", " math_geq "],
  [" < ", " math_lt "],
  [" > ", " math_gt "]
]

const defaultPrefixes = [
  "PREFIX dbr: <http://dbpedia.org/resource/>",
  "PREFIX dbo: <http://dbpedia.org/ontology/>",
  "PREFIX dbp: <http://dbpedia.org/property/>"
].join("\n")

export function reverseReplacements(encodedSparql: string) {
  // for r in REPLACEMENTS:
  //     original = r[0]
  //     encoding = r[-1]
  //     sparql = sparql.replace(encoding, original)
  //     stripped_encoding = str.strip(encoding)
  //     sparql = sparql.replace(stripped_encoding, original)
  // return sparql

  REPLACEMENTS.forEach((r) => {
    const original = r[0]
    const encoding = r[r.length - 1]
    const encodingRegex = new RegExp(encoding, "g")
    encodedSparql = encodedSparql.replace(encodingRegex, original)

    const strippedEncoding = encoding.trim()
    const strippedEncodingRegex = new RegExp(strippedEncoding, "g")
    encodedSparql = encodedSparql.replace(strippedEncodingRegex, original)
  })

  return encodedSparql
}

export function reverseShortenQuery(shortSparql: string) {
  // TO_DO - Replace _oba_ and _obd_ with full words
  // sparql = re.sub(r'_oba_ ([\S]+)', 'order by asc (\\1)', sparql, flags=re.IGNORECASE)
  // sparql = re.sub(r'_obd_ ([\S]+)', 'order by desc (\\1)', sparql, flags=re.IGNORECASE)
  return shortSparql
}

export function replaceDBR(sparql: string) {
  const regex = /dbr:([^\s]+)/ // RegExp(`${original}([^s]+)`)

  if (sparql.match(regex)) {
    sparql = sparql.replace(regex, `<http://dbpedia.org/resource/$1>`)
  }

  return sparql
}

export function cleanDBO(sparql: string) {
  const regex = /<(dbo:[^\s]+)>/
  if (sparql.match(regex)) {
    sparql = sparql.replace(regex, `$1`)
  }

  return sparql
}

export function replacePrefix(prefix: string, url: string, sparql: string) {
  const regex = new RegExp(`${prefix}(\\S*)`, "g")

  if (sparql.match(regex)) {
    // Make sure url has a slash at the end
    sparql = sparql.replace(regex, `<${url}$1>`)
  }

  return sparql
}

export function replacePrefixes(sparql: string) {
  REPLACEMENTS
    // Only sub arrays with more than 2 elements have url
    // .filter((r) => r.length > 2)
    .slice(0, 4)
    .forEach((r) => {
      const prefix = r[0]
      const url = r[r.length - 2]

      sparql = replacePrefix(prefix, url, sparql)
    })

  return sparql
}

export function fixURI(sparql: string) {
  //   sparql = replaceDBR(sparql)
  sparql = cleanDBO(sparql)
  sparql = replacePrefixes(sparql)

  // edge case
  //   if query[-2:]=="}>":
  // 		query = query[:-2]+">}"
  if (sparql.substring(sparql.length - 2, sparql.length) === "}>") {
    sparql = sparql.slice(0, -2) + ">}"
  }

  return sparql
}

export default function decoder(encodedSparql: string) {
  // decode
  // --> reverse replacements returns short_sparql
  const shortSparql = reverseReplacements(encodedSparql)
  // --> reverse shorten query returns sparql
  const sparql = reverseShortenQuery(shortSparql)
  // fix uri
  const query = fixURI(sparql)

  // return [defaultPrefixes, query].join("\n")
  return query
}
