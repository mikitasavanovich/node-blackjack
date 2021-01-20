import { Context } from 'koa'
import { User } from '../models/User'
import * as userService from '../services/user'

export const getUserInfo = (ctx: Context) => {
  const player = ctx.state.user as User

  ctx.body = player.serialize()
}

export const addToWallet = (ctx: Context) => {
  const sum: number = ctx.request.body.sum

  if (!sum) {
    ctx.throw(400)
  }

  const player = ctx.state.user as User

  const updatedUser = userService.addToWallet(sum, player)

  ctx.body = updatedUser.serialize()
}
