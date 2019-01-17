import config from "./index"

export const winstonFileName: string = config.get("WINSTON.FILENAME")
export const winstonDirName: string = config.get("WINSTON.DIRNAME")
