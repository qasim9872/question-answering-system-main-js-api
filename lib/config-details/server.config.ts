import config from "./index"

export const serverPort: number = config.get("SERVER.PORT")
export const appSecret: string = config.get("SERVER.SECRET")
