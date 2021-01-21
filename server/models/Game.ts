import shortid from 'shortid'
import { Deck } from './Deck'
import { Player } from './Player'
import { GAME_TIMEOUT_MS, GAME_STATE, GAME_MAX_VALUE, WINNING_RATE } from '../constants'

import { User } from './User'
import { Dealer } from './Dealer'
import { IGameHandler } from '../interfaces'

export class Game {
  id = shortid.generate()
  players: Player[] = [];
  dealer: Dealer;
  deck: Deck;
  timeoutMS = GAME_TIMEOUT_MS
  state: GAME_STATE = GAME_STATE.JOINING
  gameHandler: IGameHandler = this.initEventEmitter()
  timer: ReturnType<typeof setTimeout> | null

  private initEventEmitter () {
    return {
      bet: () => {
        if (this.players.every(player => player.bet > 0)) {
          this.setStartingHands()
          this.state = GAME_STATE.PLAYER_TURN
          this.players[0].startTurn()

          clearTimeout(this.timer)
          this.timer = setTimeout(this.handleExceededTimeout, GAME_TIMEOUT_MS)
        }
      },
      draw: (player: Player | Dealer) => {
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

          clearTimeout(this.timer)
          this.timer = setTimeout(this.handleExceededTimeout, GAME_TIMEOUT_MS)
        }
      },
      stay: (player: Player) => {
        player.endTurn()
        this.setNextPlayerOrDealer(player)
      },
      finish: () => {
        this.state = GAME_STATE.FINISHED
        this.calculateResults()
      }
    }
  }

  public hasState (state: GAME_STATE) {
    return this.state === state
  }

  public getPlayer (user: User) {
    return this.players.find(player => player.userId === user.id)
  }

  public addPlayer (user: User) {
    const player = new Player(user, this.gameHandler)
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
    this.dealer = new Dealer(this.gameHandler)
    this.players.forEach(player => {
      player.clearState()
      player.waitForBet()
    })
    this.state = GAME_STATE.WAITING_FOR_BETS
    this.timer = setTimeout(this.handleExceededTimeout, GAME_TIMEOUT_MS)
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
    clearTimeout(this.timer)

    if (playerIndex === this.players.length - 1) {
      if (this.players.every(player => player.hasLost())) {
        this.state = GAME_STATE.FINISHED
      } else {
        this.state = GAME_STATE.DEALER_TURN
        this.dealer.play()
      }
    } else {
      const nextPlayer =
        this.players.slice(playerIndex + 1)
          .find(player => !player.hasWon() && !player.hasLost())

      nextPlayer.startTurn()
      this.timer = setTimeout(this.handleExceededTimeout, GAME_TIMEOUT_MS)
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

  private handleExceededTimeout = () => {
    switch (this.state) {
      case GAME_STATE.WAITING_FOR_BETS:
        this.players.forEach(player => {
          if (player.betting()) {
            player.lose()
          }
        })
        return
      case GAME_STATE.PLAYER_TURN: {
        const afkPlayer = this.players.find(player => player.plays())
        this.gameHandler.stay(afkPlayer)
      }
        break
      default:
    }
    this.timer = setTimeout(this.handleExceededTimeout, GAME_TIMEOUT_MS)
  }

  public serialize () {
    return {
      id: this.id,
      players: this.players.map(player => player.serialize()),
      dealer: this.dealer ? this.dealer.serialize() : null,
      deck: this.deck ? this.deck.serialize() : null,
      state: this.state
    }
  }
}
