import shortid from 'shortid'
import { Deck } from './models/Deck'

const decks = {}

export const createDeck = (shuffle: boolean) => {
  const deck = new Deck()

  if (shuffle) {
    deck.shuffle()
  }

  const id = shortid.generate()
  decks[id] = deck

  return {
    id,
    deck
  }
}
