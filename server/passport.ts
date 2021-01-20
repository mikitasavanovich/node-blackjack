import { BasicStrategy } from 'passport-http'
import passport from 'koa-passport'
import * as userData from './data-access/user'

passport.use(new BasicStrategy((username: string, password: string, done) => {
  try {
    const user = userData.findUser({ username })

    if (!user || !user.validateCredentials(username, password)) {
      return done(null, false)
    }

    return done(null, user)
  } catch (error) {
    done(error)
  }
}))
