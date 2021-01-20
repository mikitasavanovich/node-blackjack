import shortid from 'shortid'
import { WithHand } from './WithHand'
import { IGameHandler } from '../interfaces'

export class Dealer extends WithHand {
  id = shortid.generate()
  gameHandler: IGameHandler

  constructor (gameHandler: IGameHandler) {
    super()
    this.gameHandler = gameHandler
  }

  public play () {
    this.hand[1].setCardVisibility(true)

    while (true) {
      if (this.getHandScore() >= 17) {
        this.gameHandler.finish()
        return
      } else {
        this.gameHandler.draw(this)
      }
    }
  }

  public serialize () {
    return {
      hand: this.hand.map(card => card.serialize()),
      score: this.hasHiddenCards() ? 'hidden' : this.getHandScore()
    }
  }
}
