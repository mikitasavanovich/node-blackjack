import { Player } from '../models/Player'

export const addToWallet = (sum: number, player: Player) => {
  player.addToWallet(sum)

  return true
}
