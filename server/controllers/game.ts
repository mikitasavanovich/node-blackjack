import { Context } from 'koa'
import { GAME_STATE } from '../constants'
import { User } from '../models/User'
import { Game } from '../models/Game'
import { Player } from '../models/Player'
import * as gameService from '../services/game'

interface IGameFilters {
  state?: GAME_STATE
}

export const createGame = (ctx: Context) => {
  const user = ctx.state.user as User

  const game = gameService.createGame(user)

  if (!game) {
    ctx.throw(400)
  }

  ctx.body = game.serialize()
}

export const getGames = (ctx: Context) => {
  const { state } = ctx.query as IGameFilters

  const games = gameService.getGames({ state })

  ctx.body = games
}

export const joinGame = async (ctx: Context) => {
  const user = ctx.state.user as User
  const game = ctx.state.game as Game

  const updatedGame = gameService.addPlayerToGame(game, user)

  if (updatedGame === null) {
    ctx.throw(404)
  } else if (updatedGame === false) {
    ctx.throw(400)
  }

  ctx.body = updatedGame.serialize()
}

export const startGame = (ctx: Context) => {
  const game = ctx.state.game as Game

  const updatedGame = gameService.startGame(game)

  ctx.body = updatedGame.serialize()
}

export const placeBet = (ctx: Context) => {
  const user = ctx.state.user as User
  const game = ctx.state.game as Game
  const { sum } = ctx.request.body as { sum: number }

  const updatedGame = gameService.placeBet(game, user, sum)

  if (!updatedGame) {
    ctx.throw(400)
  }

  ctx.body = updatedGame.serialize()
}

export const drawCard = async (ctx: Context) => {
  const { player, game } = ctx.state as { player: Player, game: Game }

  const updatedGame = gameService.drawCard(game, player)

  if (!updatedGame) {
    ctx.throw(400)
  }

  ctx.body = updatedGame.serialize()
}

export const stay = async (ctx: Context) => {
  const { player, game } = ctx.state as { player: Player, game: Game }

  const updatedGame = gameService.finishTurn(game, player)

  if (!updatedGame) {
    ctx.throw(400)
  }

  ctx.body = updatedGame.serialize()
}
