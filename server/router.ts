import Router from 'koa-router'
import * as authController from './controllers/auth'
import * as controller from './controller'

const router = new Router({ prefix: '/api' })

// auth routes
router.post('/sign-up', authController.signUp)

router.post('/deck', controller.createDeck)
router.post('/deck/:id/cards', controller.extractCards)

export default router
