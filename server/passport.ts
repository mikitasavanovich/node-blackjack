import { BasicStrategy } from 'passport-http'
import passport from 'koa-passport'
import * as playerData from './data-access/player'

passport.use(new BasicStrategy((username: string, password: string, done) => {
  try {
    const player = playerData.findPlayer({ username })

    if (!player || !player.validateCredentials(username, password)) {
      return done(null, false)
    }

    return done(null, player)
  } catch (error) {
    done(error)
  }
}))
