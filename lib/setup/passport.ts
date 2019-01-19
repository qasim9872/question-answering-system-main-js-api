import * as passport from "passport"
import * as passportJwt from "passport-jwt"
import * as passportLocal from "passport-local"

import { appSecret } from "../config-details/server.config"
import User, { IUserModel, userSchema } from "../model/user"

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
      })
    }
  )
)

passport.use(
  new jwtStrategy(
    {
      jwtFromRequest: extractJWT.fromAuthHeaderAsBearerToken(),
      secretOrKey: appSecret
    },
    (payload, done) => {
      User.findOne({ email: payload.email.toLowerCase() }, (err, user: any) => {
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

export function login() {
  return passport.authenticate("local", {
    session: false
  })
}

export function isAuthenticated() {
  return passport.authenticate("jwt", {
    session: false
  })
}
