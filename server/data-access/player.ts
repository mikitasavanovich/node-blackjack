import { Player } from '../models/Player'

const players: Player[] = []

export const createPlayer = (username: string, password: string): Player => {
  const player = new Player(username, password)

  players.push(player)

  return player
}

export const findPlayer = (options: { id?: string, username?: string }) => {
  const player = players.find(
    player => Object.entries(options).every(
      ([key, value]) => player[key] && player[key] === value)
  )

  return player
}
