import { BasicStrategy } from 'passport-http'
import passport from 'koa-passport'
import * as userService from './services/auth'

passport.use(new BasicStrategy((username: string, password: string, done) => {
  try {
    const user = userService.validateUser(username, password)

    if (!user) {
      return done(null, false)
    }

    return done(null, user)
  } catch (error) {
    done(error)
  }
}))
