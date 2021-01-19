import Koa from 'koa'
import router from './router'
import bodyParser from 'koa-bodyparser'

const app = new Koa()

app.use(bodyParser())
app.use(router.routes())
app.use(router.allowedMethods())

app.listen(4001, () => console.log('Running on port 4001'))
