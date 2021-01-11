import * as dataAccess from './dataAccess'
import { Deck } from './models/Deck'

export const createDeck = (): { id: string, deck: Deck } => {
  const shuffle = true

  const result = dataAccess.createDeck(shuffle)
  return result
}

export const extractCards = (id: string, count: number) => {
  const deck = dataAccess.getDeckById(id)

  const cards = deck.getCards(count)

  return {
    cards,
    deck
  }
}
