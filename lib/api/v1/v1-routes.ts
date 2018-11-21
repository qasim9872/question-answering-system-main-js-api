import Router from "express-promise-router"
import { join } from "path"
import { readdirAsync } from "../../utils/fs-promise"
import { IRoute } from "../IRoute.interface"

import Logger from "../../utils/logger"
const logger = Logger.getLogger(__filename)

const routes = join(__dirname, "routes")
const router = Router()

async function bootstrapRoutes() {
  const routeFileNames = await readdirAsync(routes)

  return Promise.all(
    routeFileNames.map((file) => {
      const filePath = join(routes, file)
      import(filePath)
        .then((routeImport) => {
          const route: IRoute = routeImport.endpoint

          const endpointPath: string = `/${route.name}`
          const handler = route.handler

          router[route.requestType](endpointPath, handler)

          logger.info(`bootstrapped route: ${route.name}`)
          return
        })
        .catch((err) => {
          logger.error(`Error bootstrapping route:  ${file} ->  ${err}`)
        })
    })
  )
}

bootstrapRoutes()

export default router
