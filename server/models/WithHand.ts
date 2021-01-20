import { Card } from './Card'
import { CARD_SCORES, CARD_VALUE, GAME_MAX_VALUE } from '../constants'

export class WithHand {
  hand: Card[] = []

  public addToHand (cards: Card[]) {
    this.hand.push(...cards)
  }

  public getHandScore () {
    const score = this.hand.reduce((result, card) => {
      if (card.value === CARD_VALUE.ACE) {
        return result + CARD_SCORES.ACE11 >= GAME_MAX_VALUE
          ? CARD_SCORES.ACE1
          : CARD_SCORES.ACE11
      } else {
        return result + CARD_SCORES[card.value]
      }
    }, 0)

    return score
  }
}
