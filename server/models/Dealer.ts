import shortid from 'shortid'
import { EventEmitter } from 'events'
import { WithHand } from './WithHand'
import { GAME_EVENTS } from '../constants'

export class Dealer extends WithHand {
  id = shortid.generate()
  gameEventEmitter: EventEmitter

  constructor (eventEmitter: EventEmitter) {
    super()
    this.gameEventEmitter = eventEmitter
  }

  public play () {
    this.hand[1].setCardVisibility(true)

    while (true) {
      if (this.getHandScore() >= 17) {
        this.gameEventEmitter.emit(GAME_EVENTS.FINISH)
      } else {
        this.gameEventEmitter.emit(GAME_EVENTS.DRAW)
      }
    }
  }
}
