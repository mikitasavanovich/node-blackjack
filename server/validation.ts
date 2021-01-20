import { Context, Next } from 'koa'
import * as gameData from './data-access/game'

export const gameExists = async (ctx: Context, next: Next) => {
  const gameId: string = ctx.params.id

  if (!gameId) {
    ctx.throw(400)
  }

  const game = gameData.findGame({ id: gameId })

  if (!game) {
    ctx.throw(404)
  }

  ctx.state.game = game
  await next()
}
