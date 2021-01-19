import { Context } from 'koa'
import { Player } from '../models/Player'

export const getUserInfo = (ctx: Context) => {
  const player = ctx.state.user as Player

  ctx.body = player.serialize()
}
