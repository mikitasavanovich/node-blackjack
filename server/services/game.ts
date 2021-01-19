import { Player } from '../models/Player'
import * as gameData from '../data-access/game'
import { GAME_STATE } from '../constants'

export const createGame = (player: Player) => {
  const game = gameData.createGame()
  game.addPlayer(player)

  return game
}

export const getGames = (options: { state?: GAME_STATE }) => {
  const games = gameData.getGames(options)

  return games
}

export const addPlayerToGame = (gameId: string, player: Player) => {
  const game = gameData.findGame({ id: gameId })

  if (!game) {
    return null
  }

  if (game.hasPlayer(player)) {
    return false
  }

  game.addPlayer(player)

  return game
}
