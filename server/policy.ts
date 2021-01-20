import { Context, Next } from 'koa'
import { User } from './models/User'
import { Game } from './models/Game'

export const hasGameAccess = async (ctx: Context, next: Next) => {
  const user = ctx.state.user as User
  const game = ctx.state.game as Game

  const player = game.getPlayer(user)

  if (!player) {
    ctx.throw(400)
  }

  ctx.state.player = player

  await next()
}
