/* tslint:disable:no-var-requires */
const expressListRoutes = require("express-list-routes")

export default function listRoutes(
  prefix: string,
  name: string,
  router: any
): any {
  expressListRoutes({ prefix: `/api/v1${prefix}` }, `${name}:`, router)
}
