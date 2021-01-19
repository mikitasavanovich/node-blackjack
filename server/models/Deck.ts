import { Card } from './Card'
import { CARD_SUIT, CARD_VALUE } from '../constants'

export class Deck {
  private cards: Card[]

  constructor () {
    this.cards = Object.values(CARD_VALUE).reduce(
      (result, value) => result.concat(Object.values(CARD_SUIT).reduce(
        (result2, suit) => result2.concat(new Card(suit, value)), []
      )), []
    )
  }

  public shuffle () {
    for (let i = 0; i < 1000; ++i) {
      const loc1 = Math.floor((Math.random() * this.cards.length))
      const loc2 = Math.floor((Math.random() * this.cards.length))

      const tmp = this.cards[loc1]
      this.cards[loc1] = this.cards[loc2]
      this.cards[loc2] = tmp
    }
  }

  public length () {
    return this.cards.length
  }

  public getCards (count) {
    const modifiedCount = this.cards.length < count ? this.cards.length : count

    return this.cards.splice(0, modifiedCount)
  }
}

// 1st player -> POST '/game' -> new Game(title) -> joining state
// 2nd, 3rd ... players -> POST '/game/:id/join' -> Game connects player
// 1st player -> POST '/game/:id/start' -> Game to betting state
// all players -> POST 'game/:id/bet' -> Game checks that all bets are provided, gives all players and dealer cards and goes to 1st player turn
// 1st, 2nd ... players ->
