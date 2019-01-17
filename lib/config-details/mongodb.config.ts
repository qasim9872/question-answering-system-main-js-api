import config from "./index"

export const name: string = config.get("DB.NAME")
export const port: number = config.get("DB.PORT")
export const host: string = config.get("DB.HOST")
