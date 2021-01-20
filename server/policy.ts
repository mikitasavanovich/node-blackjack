import { Context, Next } from 'koa'
import { User } from './models/User'
import { Game } from './models/Game'

export const hasGameAccess = async (ctx: Context, next: Next) => {
  const user = ctx.state.user as User
  const game = ctx.state.game as Game

  if (!game.getPlayer(user)) {
    ctx.throw(400)
  }

  await next()
}
