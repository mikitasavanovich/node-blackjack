import { DefaultState, Context } from 'koa'
import Router from 'koa-router'
import passport from 'koa-passport'
import * as authController from './controllers/auth'
import * as userControler from './controllers/user'
import * as controller from './controller'

const router = new Router<DefaultState, Context>({ prefix: '/api' })

// auth routes
router.post('/sign-up', authController.signUp)
router.post('/sign-in', authController.signIn)

// user routes
router.get('/user-info', passport.authenticate('basic', { session: false }), userControler.getUserInfo)

router.post('/deck', controller.createDeck)
router.post('/deck/:id/cards', controller.extractCards)

export default router
