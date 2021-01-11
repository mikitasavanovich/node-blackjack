import { Context } from 'koa'
import * as service from './service'

export const createDeck = async (ctx: Context) => {
  const result = service.createDeck()

  ctx.body = {
    id: result.id,
    deckSize: result.deck.length()
  }
}

export const extractCards = async (ctx: Context) => {
  const { id } = ctx.params
  const { count = 1 } = ctx.query

  if (!id) {
    ctx.throw(401)
  }

  const result = service.extractCards(id, count)

  ctx.body = {
    id,
    cards: result.cards,
    remainingSize: result.deck.length()
  }
}
