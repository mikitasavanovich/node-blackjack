import { Card } from './Card'
import { Player } from './Player'
import { PLAYER_STATE } from '../constants'

export class PlayerGameState {
  playerId: string;
  hand: Card[] = [];
  bet: number = 0;
  state = PLAYER_STATE.WAITS

  constructor (player: Player) {
    this.playerId = player.id
  }
}
