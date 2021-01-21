import Koa from 'koa'
import router from './router'
import bodyParser from 'koa-bodyparser'
import passport from 'koa-passport'
import cors from '@koa/cors'

require('./passport')

const app = new Koa()

app.use(async (ctx, next) => {
  try {
    await next()
  } catch (error) {
    console.error(error)
    ctx.status = error.status || 500
  }
})

app.use(cors({
  origin: 'http://localhost:3000'
}))
app.use(bodyParser())
app.use(passport.initialize())
app.use(router.routes())
app.use(router.allowedMethods())

export default app
