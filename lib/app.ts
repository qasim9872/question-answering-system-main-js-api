// Config
import { appSecret } from "./config/server.config"

// Core
import * as express from "express"
import { NextFunction, Request, Response } from "express"

// Middlewares
import { json, urlencoded } from "body-parser"
import compression = require("compression")
import cors = require("cors")
import * as session from "express-session"
import * as helmet from "helmet"
import morgan = require("morgan")

// Api
import { default as api } from "./api/api"

// Utils
import { GenericCustomError, NotFoundError } from "./utils/error"
import Logger from "./utils/logger"
const logger = Logger.getLogger(__filename)

const app = express()

// =======================
// configuration =========
// =======================

app.use(
  session({
    secret: appSecret,
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 60000
    }
  })
)
app.use(
  urlencoded({
    extended: false
  })
)
app.use(compression())
app.use(json())
app.use(cors())
app.use(
  morgan("combined", {
    stream: {
      write: (str) => {
        logger.info(str)
      }
    }
  })
)

// =======================
// security ==============
// =======================
app.use(helmet())
app.disable("x-powered-by")

// =======================
// routes ================
// =======================

app.use("/api", api)

// =======================
// error handling ========
// =======================

// catch 404 and forward to error handler
app.use((req: Request, res: Response, next: NextFunction) => {
  const err = new NotFoundError(`Resource Not Found: ${req.path}`)
  next(err)
})

// error handler
app.use(
  (
    err: GenericCustomError,
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    logger.error(err)
    res.status(err.code || 500).send(err)
  }
)

export default app
