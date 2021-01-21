import { Socket } from 'socket.io'
import { Player } from './models/Player'
import { Dealer } from './models/Dealer'
import { User } from './models/User'

export interface ExtendedSocket extends Socket {
  user: User
}
export interface IGameHandler {
  bet: () => void;
  draw: (player: Player | Dealer) => void;
  stay: (player: Player) => void;
  finish: () => void;
}

export interface ServiceResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
}
