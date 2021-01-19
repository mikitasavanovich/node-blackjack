import { Context } from 'koa'
import * as authService from '../services/auth'

export const signUp = (ctx: Context) => {
  const { username, password } = ctx.request.body

  if (!username || !password) {
    ctx.throw(400)
  }

  const token = authService.signUp(username, password)

  if (!token) {
    ctx.throw(400)
  }

  ctx.body = {
    token
  }
}
