import { Casino } from '../models/Casino'
import { Game } from '../models/Game'
import { Player } from '../models/Player'

export const createGame = (player: Player, casino: Casino) => {
  const game = new Game()

  game.addPlayer(player)
  casino.addGame(game)

  return game
}
