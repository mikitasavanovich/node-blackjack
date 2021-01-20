import { Player } from './models/Player'
import { Dealer } from './models/Dealer'

export interface IGameHandler {
  bet: () => void;
  draw: (player: Player | Dealer) => void;
  stay: (player: Player) => void;
  finish: () => void;
}
