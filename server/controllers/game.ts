import { Context } from 'koa'
import { Casino } from '../models/Casino'
import { Player } from '../models/Player'
import * as gameService from '../services/game'

export const createGame = (ctx: Context) => {
  const casino = ctx.casino as Casino
  const player = ctx.state.user as Player

  const game = gameService.createGame(player, casino)

  ctx.body = game.serialize()
}
