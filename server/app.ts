import Koa from 'koa'
import router from './router'
import bodyParser from 'koa-bodyparser'
import passport from 'koa-passport'

require('./passport')

const app = new Koa()

// app.use(async (ctx, next) => {
//   try {
//     await next()
//   } catch (error) {
//     console.error()
//     ctx.throw(500)
//   }
// })

app.use(bodyParser())
app.use(passport.initialize())
app.use(router.routes())
app.use(router.allowedMethods())

export default app
