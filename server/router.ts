import Router from 'koa-router'
import * as controller from './controller'

const router = new Router({ prefix: '/api/v1' })

router.post('/deck', controller.createDeck)

export default router
