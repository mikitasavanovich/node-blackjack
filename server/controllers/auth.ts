import { Context } from 'koa'
import * as authService from '../services/auth'

interface ICredentials {
  username: string;
  password: string;
}

export const signUp = (ctx: Context) => {
  const { username, password } = ctx.request.body as ICredentials

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

export const signIn = (ctx: Context) => {
  const { username, password } = ctx.request.body as ICredentials

  if (!username || !password) {
    ctx.throw(401)
  }

  const token = authService.signIn(username, password)

  if (!token) {
    ctx.throw(401)
  }

  ctx.body = {
    token
  }
}
