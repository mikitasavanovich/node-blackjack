import shortid from 'shortid'
import { Deck } from './models/Deck'

const decks: { [id: string]: Deck } = {}

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

export const getDeckById = (id: string) => {
  return decks[id]
}
