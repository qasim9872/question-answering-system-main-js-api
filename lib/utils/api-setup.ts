import Router from "express-promise-router"
import { join } from "path"
import { IRoute } from "../api/IRoute.interface"
import { readdirAsync } from "./fs-promise"
import Logger from "./logger"

/* tslint:disable:no-var-requires */
const validate = require("express-validation")

const filterFileExtensions = [".ts", ".js"]

export async function bootstrapRoutes(routes: string, logger: Logger) {
  const router = Router()
  const routeFileNames = await readdirAsync(routes)

  await Promise.all(
    routeFileNames
      .filter((file) => {
        // filter type definitions by searching for '.d.' in the last 5 characters of the file name
        if (file.includes(".d.", file.length - 5)) {
          return false
        }

        const extension = file.substring(file.length - 3)

        return filterFileExtensions.indexOf(extension) >= 0
      })
      .map((file) => {
        const filePath = join(routes, file)
        import(filePath)
          .then((routeImport) => {
            const route: IRoute = routeImport.endpoint
            const handlers = []

            const endpointPath: string = `/${route.name}`

            if (route.validationSchema) {
              handlers.push(validate(route.validationSchema))
            }

            handlers.push(route.handler)

            router[route.requestType](endpointPath, handlers)

            logger.info(`bootstrapped route: ${route.name}`)
            return
          })
          .catch((err) => {
            logger.error(`Error bootstrapping route:  ${file} ->  ${err}`)
          })
      })
  )

  return router
}
