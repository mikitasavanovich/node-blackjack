import { Context } from 'koa'
import * as service from './service'

export const createDeck = async (ctx: Context) => {
  const result = service.createDeck()

  ctx.body = {
    id: result.id,
    deckSize: result.deck.length()
  }
}
