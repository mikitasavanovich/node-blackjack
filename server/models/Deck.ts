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

    this.shuffle()
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

  public getCards (count: number) {
    return this.cards.splice(0, count)
  }

  public serialize () {
    return {
      length: this.length()
    }
  }
}
