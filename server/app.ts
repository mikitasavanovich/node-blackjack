import Koa from 'koa'
import router from './router'

const app = new Koa()

app.use(router.routes())
app.use(router.allowedMethods())

app.listen(3001, () => console.log('hi'))
