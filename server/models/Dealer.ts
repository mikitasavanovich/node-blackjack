import shortid from 'shortid'
import { WithHand } from './WithHand'

export class Dealer extends WithHand {
  id = shortid.generate()
}
