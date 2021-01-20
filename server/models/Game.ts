import { EventEmitter } from 'events'
import shortid from 'shortid'
import { Deck } from './Deck'
import { Player } from './Player'
import { GAME_TIMEOUT_MS, GAME_STATE, GAME_EVENTS, GAME_MAX_VALUE, WINNING_RATE } from '../constants'

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
        this.setStartingHands()
        this.state = GAME_STATE.PLAYER_TURN
        this.players[0].startTurn()
      }
    })

    eventEmitter.on(GAME_EVENTS.DRAW, (player: Player | Dealer) => {
      const cards = this.deck.getCards(1)
      player.addToHand(cards)

      if (player instanceof Player) {
        if (player.getHandScore() >= GAME_MAX_VALUE) {
          player.endTurn()
          this.setNextPlayerOrDealer(player)
        }

        if (player.getHandScore() > GAME_MAX_VALUE) {
          player.lose()
        }
      }
    })

    eventEmitter.on(GAME_EVENTS.STAY, (player: Player) => {
      player.endTurn()
      this.setNextPlayerOrDealer(player)
    })

    eventEmitter.on(GAME_EVENTS.FINISH, () => {
      this.state = GAME_STATE.FINISHED
      this.calculateResults()
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

  public removePlayer (user: User) {
    const player = this.getPlayer(user)

    if (player.plays()) {
      this.setNextPlayerOrDealer(player)
    }

    this.players = this.players.filter(p => p.userId !== player.userId)

    return player
  }

  public start () {
    this.deck = new Deck()
    this.dealer = new Dealer(this.gameEventEmitter)
    this.players.forEach(player => player.clearState())
    this.state = GAME_STATE.WAITING_FOR_BETS
  }

  public setStartingHands () {
    this.players.forEach(player => {
      const cards = this.deck.getCards(2)
      player.addToHand(cards)
    })

    const dealerCards = this.deck.getCards(2)
    dealerCards[1].setCardVisibility(false)
    this.dealer.addToHand(dealerCards)
  }

  public setNextPlayerOrDealer (lastPlayer: Player) {
    const playerIndex = this.players.indexOf(lastPlayer)

    if (playerIndex === this.players.length - 1) {
      if (this.players.every(player => player.hasLost())) {
        this.state = GAME_STATE.FINISHED
      } else {
        this.state = GAME_STATE.DEALER_TURN
      }
    } else {
      this.players[playerIndex + 1].startTurn()
    }
  }

  public calculateResults () {
    const dealerScore = this.dealer.getHandScore()
    const idlePlayers = this.players.filter(player => !player.hasLost() && !player.hasWon())

    idlePlayers.forEach(player => {
      const playerScore = player.getHandScore()
      if (dealerScore >= GAME_MAX_VALUE || dealerScore < playerScore) {
        player.win(WINNING_RATE.USUAL)
      } else if (dealerScore === playerScore) {
        player.win(WINNING_RATE.PUSH)
      } else {
        player.lose()
      }
    })
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
