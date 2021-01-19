import { Card } from './Card'
import { Player } from './Player'

export class PlayerGameState {
  playerId: string;
  hand: Card[] = [];
  bet: number = 0;

  constructor (player: Player) {
    this.playerId = player.id
  }
}
