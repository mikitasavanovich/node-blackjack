import { User } from '../models/User'
import { Game } from '../models/Game'
import * as gameData from '../data-access/game'
import { GAME_STATE, GAME_BUY_IN_SUM, GAME_EVENT } from '../constants'
import { ServiceResponse } from '../interfaces'

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
  player.placeBet(sum)
  return game
}

export const drawCard = (game: Game, user: User) => {
  const player = game.getPlayer(user)
  player.draw()
  return game
}

export const finishTurn = (game: Game, user: User) => {
  const player = game.getPlayer(user)
  player.stay()
  return game
}

export const leaveGame = (game: Game, user: User) => {
  const leaver = game.removePlayer(user)
  user.addToWallet(leaver.buyInSum)

  return game
}

export const checkGameExists = (gameId: string): ServiceResponse<Game> => {
  const game = gameData.findGame({ id: gameId })

  if (!game) {
    return { success: false }
  }

  return { success: true, data: game }
}

export const getUserGame = (user: User) => {
  const game = gameData.findGameByPlayers({ userId: user.id })
  return game
}

export const validateAccessToGame = ({
  game,
  user,
  event,
  payload
} : {
  game: Game,
  user: User,
  event: GAME_EVENT,
  payload: {
    betSum?: number
  }
}): ServiceResponse<Game> => {
  const player = game.getPlayer(user)

  switch (event) {
    case GAME_EVENT.JOIN:
      if (player) {
        return { success: false, message: 'You are already in game' }
      } else if (!game.hasState(GAME_STATE.JOINING)) {
        return { success: false, message: 'You cannot join this game' }
      } else if (!user.hasSum(GAME_BUY_IN_SUM)) {
        return { success: false, message: 'You don\'t have enough money' }
      }
      break
    case GAME_EVENT.START:
      if (!player) {
        return { success: false, message: 'You are not a member of this game' }
      } else if (!game.hasState(GAME_STATE.JOINING) && !game.hasState(GAME_STATE.FINISHED)) {
        return { success: false, message: 'This game cannot be started' }
      }
      break
    case GAME_EVENT.BET:
      if (!player || !player.betting() || !game.hasState(GAME_STATE.WAITING_FOR_BETS)) {
        return { success: false, message: 'You cannot bet in this game' }
      } else if (!player.hasBet(payload.betSum)) {
        return { success: false, message: 'You don\'t have a sum for this bet' }
      }
      break
    case GAME_EVENT.HIT:
    case GAME_EVENT.STAY:
      if (!player) {
        return { success: false, message: 'You cannot play in this game' }
      } else if (!player.plays() || !game.hasState(GAME_STATE.PLAYER_TURN)) {
        return { success: false, message: 'It it not your turn' }
      }
      break
    default:
  }

  return { success: true }
}
