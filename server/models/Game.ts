import { EventEmitter } from 'events'
import shortid from 'shortid'
import { Deck } from './Deck'
import { Player } from './Player'
import { GAME_TIMEOUT_MS, GAME_STATE, GAME_EVENTS } from '../constants'

import { User } from './User'
import { Dealer } from './Dealer'

export class Game {
  id = shortid.generate()
  players: Player[] = [];
  dealer: Dealer;
  deck: Deck;
  timeoutMS = GAME_TIMEOUT_MS
  state: GAME_STATE = GAME_STATE.JOINING
  gameEventEmitter: EventEmitter = this.initEventEmitter()

  private initEventEmitter () {
    const eventEmitter = new EventEmitter()

    eventEmitter.on(GAME_EVENTS.BET, () => {
      if (this.players.every(player => player.bet > 0)) {
        this.state = GAME_STATE.PLAYER_TURN
        this.players[0].startTurn()
      }
    })

    return eventEmitter
  }

  public getPlayer (user: User) {
    return this.players.find(player => player.userId === user.id)
  }

  public addPlayer (user: User) {
    const player = new Player(user, this.gameEventEmitter)
    this.players.push(player)
  }

  public start () {
    this.deck = new Deck()
    this.dealer = new Dealer()
    this.players.forEach(player => player.clearState())
    this.state = GAME_STATE.WAITING_FOR_BETS
  }

  public serialize () {
    return {
      id: this.id,
      players: this.players,
      deck: this.deck ? this.deck.serialize() : null,
      state: this.state
    }
  }
}
