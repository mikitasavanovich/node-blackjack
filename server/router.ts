import Router from 'koa-router'
import * as controller from './controller'

const router = new Router({ prefix: '/api/v1' })

router.post('/deck', controller.createDeck)
router.post('/deck/:id/cards', controller.extractCards)

export default router
