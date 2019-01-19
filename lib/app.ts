// Config
import { appSecret } from "./config-details/server.config"

// Core
import * as express from "express"

// Middlewares
import { json, urlencoded } from "body-parser"
import * as compression from "compression"
import * as cors from "cors"
import * as session from "express-session"
import * as helmet from "helmet"
import * as morgan from "morgan"
import * as passport from "passport"

// Setup
import {} from "./setup/passport"

// Api
import api from "./api"

// Utils
import { errorHandler, errorMiddleware } from "./utils/error"
import Logger from "./utils/logger"
const logger = Logger.getLogger(__filename)

const app = express()

// =======================
// configuration =========
// =======================

app.use(compression())
app.use(
  urlencoded({
    extended: false
  })
)
app.use(json())

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

app.use(passport.initialize())
app.use(passport.session())

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
app.use(errorMiddleware)

// error handler
app.use(errorHandler)

export default app
