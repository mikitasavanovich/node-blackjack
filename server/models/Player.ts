import { WithHand } from './WithHand'
import { User } from './User'
import { PLAYER_STATE, GAME_BUY_IN_SUM } from '../constants'
import { IGameHandler } from '../interfaces'

export class Player extends WithHand {
  userId: string;
  buyInSum: number = GAME_BUY_IN_SUM
  bet: number = 0;
  state = PLAYER_STATE.IDLE
  gameHandler: IGameHandler

  constructor (user: User, gameHandler: IGameHandler) {
    super()
    this.userId = user.id
    this.gameHandler = gameHandler
  }

  public clearState () {
    this.hand = []
    this.bet = 0
    this.state = PLAYER_STATE.IDLE
  }

  public startTurn () {
    this.state = PLAYER_STATE.PLAYS
  }

  public waitForBet () {
    this.state = PLAYER_STATE.BETTING
  }

  public endTurn () {
    this.state = PLAYER_STATE.IDLE
  }

  public lose () {
    this.state = PLAYER_STATE.LOST
    this.bet = 0
  }

  public win (rate: number) {
    this.state = PLAYER_STATE.WON
    this.buyInSum += this.bet * rate
    this.bet = 0
  }

  public plays () {
    return this.state === PLAYER_STATE.PLAYS
  }

  public betting () {
    return this.state === PLAYER_STATE.BETTING
  }

  public hasLost () {
    return this.state === PLAYER_STATE.LOST
  }

  public hasWon () {
    return this.state === PLAYER_STATE.WON
  }

  public hasBet (sum: number) {
    return this.buyInSum >= sum
  }

  public placeBet (sum: number) {
    this.buyInSum -= sum
    this.bet = sum
    this.state = PLAYER_STATE.IDLE

    this.gameHandler.bet()
  }

  public draw () {
    this.gameHandler.draw(this)
  }

  public stay () {
    this.gameHandler.stay(this)
  }

  public serialize () {
    return {
      userId: this.userId,
      buyInSum: this.buyInSum,
      bet: this.bet,
      state: this.state,
      hand: this.hand.map(card => card.serialize()),
      score: this.getHandScore()
    }
  }
}
