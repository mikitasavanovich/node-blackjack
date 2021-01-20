import shortid from 'shortid'
import { Card } from './Card'

export class Dealer {
  id = shortid.generate()
  hand: Card[] = [];
}
