import { Context } from 'koa'
import { GAME_STATE } from '../constants'
import { Player } from '../models/Player'
import * as gameService from '../services/game'

interface IGameFilters {
  state?: GAME_STATE
}

export const createGame = (ctx: Context) => {
  const player = ctx.state.user as Player

  const game = gameService.createGame(player)

  ctx.body = game.serialize()
}

export const getGames = (ctx: Context) => {
  const { state } = ctx.query as IGameFilters

  const games = gameService.getGames({ state })

  ctx.body = games
}
