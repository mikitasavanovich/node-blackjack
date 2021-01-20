import { Card } from './Card'
import { CARD_SCORES, CARD_VALUE, GAME_MAX_VALUE } from '../constants'

export class WithHand {
  hand: Card[] = []

  public addToHand (cards: Card[]) {
    this.hand.push(...cards)
  }

  public getHandScore () {
    let score = this.hand.reduce((result, card) =>
      card.value === CARD_VALUE.ACE
        ? result + CARD_SCORES.ACE11
        : result + CARD_SCORES[card.value]
    , 0)

    if (score > GAME_MAX_VALUE) {
      const hasAces = this.hand.some(card => card.value === CARD_VALUE.ACE)

      if (hasAces) {
        score = this.hand.reduce((result, card) =>
          card.value === CARD_VALUE.ACE
            ? result + CARD_SCORES.ACE1
            : result + CARD_SCORES[card.value]
        , 0)
      }
    }

    return score
  }

  public hasHiddenCards () {
    return this.hand.some(card => !card.visible)
  }
}
