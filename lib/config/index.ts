import * as deepmerge from "deepmerge"

/* tslint:disable:no-var-requires */
const configFile = require("./config.json")

const config: any = deepmerge(configFile, configFile, {
  arrayMerge: (a, b) => b
})

export default config
