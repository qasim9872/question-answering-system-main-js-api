import { Express } from "express"

/* tslint:disable:no-var-requires */
const expressSwagger: any = require("express-swagger-generator")
/* tslint:disable:no-var-requires */
const expressListRoutes = require("express-list-routes")

const options = {
  swaggerDefinition: {
    info: {
      description: "This API is used by the question answer system application",
      title: "QA system API",
      version: "1.0.0"
    },
    host: "localhost:8000",
    basePath: "/api/v1",
    produces: ["application/json"],
    schemes: ["http", "https"],
    securityDefinitions: {
      JWT: {
        type: "apiKey",
        in: "header",
        name: "Authorization",
        description: ""
      }
    }
  },
  // app absolute path
  basedir: __dirname,
  // relative path to the API handle folder
  files: ["./../api/routes/**/*.js", "./../api/routes/**/*.ts"]
}

export default function setupSwagger(app: Express) {
  expressSwagger(app)(options)
}