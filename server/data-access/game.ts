import { GAME_STATE } from '../constants'
import { Game } from '../models/Game'

const games: Game[] = []

export const createGame = () => {
  const game = new Game()
  games.push(game)

  return game
}

export const findGame = (options: { id?: string, userId?: string }) => {
  const game = games.find(game =>
    Object.entries(options).every(
      ([key, value]) => !value || (game[key] && game[key] === value)
    )
  )

  return game
}

export const getGames = (options: { state?: GAME_STATE }) => {
  const resultGames = games.filter(game =>
    Object.entries(options).every(
      ([key, value]) => !value || (game[key] && game[key] === value)
    )
  )

  return resultGames
}
