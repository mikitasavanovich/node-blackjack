import { User } from '../models/User'
import { Game } from '../models/Game'
import * as gameData from '../data-access/game'
import { GAME_STATE, GAME_BUY_IN_SUM } from '../constants'
import { Player } from '../models/Player'

export const createGame = (user: User) => {
  if (!user.hasSum(GAME_BUY_IN_SUM)) {
    return false
  }

  user.extractFromWallet(GAME_BUY_IN_SUM)
  const game = gameData.createGame()
  game.addPlayer(user)

  return game
}

export const getGames = (options: { state?: GAME_STATE }) => {
  const games = gameData.getGames(options)

  return games
}

export const addPlayerToGame = (game: Game, user: User) => {
  if (game.getPlayer(user) || !user.hasSum(GAME_BUY_IN_SUM)) {
    return false
  }

  user.extractFromWallet(GAME_BUY_IN_SUM)
  game.addPlayer(user)

  return game
}

export const startGame = (game: Game) => {
  game.start()
  return game
}

export const placeBet = (game: Game, user: User, sum: number) => {
  const player = game.getPlayer(user)

  if (!player.hasBet(sum)) {
    return false
  }

  player.placeBet(sum)

  return game
}

export const drawCard = (game: Game, player: Player) => {
  if (!player.plays()) {
    return
  }

  player.draw()
  return game
}

export const finishTurn = (game: Game, player: Player) => {
  if (!player.plays()) {
    return
  }

  player.stay()
  return game
}

export const leaveGame = (game: Game, user: User) => {
  const leaver = game.removePlayer(user)
  user.addToWallet(leaver.buyInSum)

  return game
}
