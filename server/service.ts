import * as dataAccess from './dataAccess'
import { Deck } from './models/Deck'

export const createDeck = (): { id: string, deck: Deck } => {
  const shuffle = true

  const result = dataAccess.createDeck(shuffle)
  return result
}
