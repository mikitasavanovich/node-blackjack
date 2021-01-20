import { EventEmitter } from 'events'
import { Card } from './Card'
import { PLAYER_STATE, GAME_BUY_IN_SUM, GAME_EVENTS } from '../constants'
import { User } from './User'

export class Player {
  userId: string;
  buyInSum: number = GAME_BUY_IN_SUM
  hand: Card[] = [];
  bet: number = 0;
  state = PLAYER_STATE.IDLE
  gameEventEmitter: EventEmitter

  constructor (user: User, eventEmitter: EventEmitter) {
    this.userId = user.id
    this.gameEventEmitter = eventEmitter
  }

  public clearState () {
    this.hand = []
    this.bet = 0
    this.state = PLAYER_STATE.IDLE
  }

  public startTurn () {
    this.state = PLAYER_STATE.PLAYS
  }

  public hasBet (sum: number) {
    return this.buyInSum >= sum
  }

  public placeBet (sum: number) {
    this.buyInSum -= sum
    this.bet = sum
    this.state = PLAYER_STATE.IDLE

    this.gameEventEmitter.emit(GAME_EVENTS.BET)
  }
}
