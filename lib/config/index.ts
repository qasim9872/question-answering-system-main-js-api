import * as deepmerge from "deepmerge"
import configData from "./config"

const config: any = deepmerge(configData, configData, {
  arrayMerge: (a, b) => b
})

export default config
