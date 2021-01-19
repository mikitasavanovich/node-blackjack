import { Game } from './Game'

export class Casino {
  games: Game[] = []

  public addGame (game: Game) {
    this.games.push(game)

    return game
  }
}
