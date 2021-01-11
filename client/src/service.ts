import { ICard } from "./interfaces"

class Service {
  apiUrl = 'http://localhost:3001/api/v1'

  async createDeck(): Promise<{ id: string }> {
    const createDeckResult = await fetch(`${this.apiUrl}/deck`, {
      method: 'POST'
    })

    return createDeckResult.json()
  }

  async drawCards(deckId: string, count: number = 1): Promise<{ cards: ICard[], id: string }> {
    const drawCardsResult = await fetch(`${this.apiUrl}/deck/${deckId}/cards?count=${count}`, {
      method: 'POST',
    })

    return drawCardsResult.json()
  }
}

export default new Service()