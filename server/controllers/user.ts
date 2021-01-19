import { Context } from 'koa'
import { Player } from '../models/Player'
import * as userService from '../services/user'

export const getUserInfo = (ctx: Context) => {
  const player = ctx.state.user as Player

  ctx.body = player.serialize()
}

export const addToWallet = (ctx: Context) => {
  const sum: number = ctx.request.body.sum

  if (!sum) {
    ctx.throw(400)
  }

  const player = ctx.state.user as Player

  userService.addToWallet(sum, player)

  ctx.status = 200
}
