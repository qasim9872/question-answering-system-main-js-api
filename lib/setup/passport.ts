import * as passport from "passport"
import * as passportAnonymous from "passport-anonymous"
import * as passportJwt from "passport-jwt"
import * as passportLocal from "passport-local"

import { appSecret } from "../config-details/server.config"
import User, { IUserModel } from "../model/user"

const anonymousStrategy = passportAnonymous.Strategy
const localStrategy = passportLocal.Strategy
const extractJWT = passportJwt.ExtractJwt
const jwtStrategy = passportJwt.Strategy

passport.serializeUser((user: IUserModel, done) => {
  done(undefined, user.id)
})

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    err ? done(err) : user ? done(err, user) : done(err)
  })
})

/**
 * Sign in using Email and Password.
 */
passport.use(
  new localStrategy(
    { usernameField: "email", passwordField: "password" },
    (email, password, done) => {
      User.findOne({ email: email.toLowerCase() }, (err, user: any) => {
        if (err) {
          return done(err)
        }
        if (!user) {
          return done(undefined, false, {
            message: `Email ${email} not found.`
          })
        }
        user.comparePassword(password, (error: Error, isMatch: boolean) => {
          if (error) {
            return done(error)
          }
          if (isMatch) {
            return done(undefined, user)
          }
          return done(undefined, false, {
            message: "Invalid email or password."
          })
        })
      }).select("+password")
    }
  )
)

/**
 * Authenticate user using signed JWT
 */
passport.use(
  new jwtStrategy(
    {
      jwtFromRequest: extractJWT.fromAuthHeaderAsBearerToken(),
      secretOrKey: appSecret
    },
    (payload, done) => {
      User.findOne({ _id: payload.id }, (err, user: any) => {
        if (err) {
          return done(err)
        }

        if (!user) {
          return done(null, false, { message: `invalid token` })
        }

        return done(null, user)
      })
    }
  )
)

passport.use(new anonymousStrategy())

export function login() {
  return passport.authenticate("local", {
    session: false
  })
}

export function isAuthenticatedOrAnonymous() {
  return passport.authenticate(["jwt", "anonymous"], {
    session: false
  })
}

export function isAuthenticated() {
  return passport.authenticate("jwt", {
    session: false
  })
}
