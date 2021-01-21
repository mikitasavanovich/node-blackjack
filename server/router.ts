import { DefaultState, Context } from 'koa'
import Router from 'koa-router'
import passport from 'koa-passport'
import * as authController from './controllers/auth'
import * as userControler from './controllers/user'
import * as gameController from './controllers/game'

const router = new Router<DefaultState, Context>({ prefix: '/api' })

// auth routes
router.post('/sign-up', authController.signUp)
router.post('/sign-in', authController.signIn)

// user routes
router.get('/user/info', passport.authenticate('basic', { session: false }), userControler.getUserInfo)
router.post('/user/wallet', passport.authenticate('basic', { session: false }), userControler.addToWallet)

// game routes
router.post('/games', passport.authenticate('basic', { session: false }), gameController.createGame)
router.get('/games', passport.authenticate('basic', { session: false }), gameController.getGames)
// router.post(
//   '/games/:id/join',
//   passport.authenticate('basic', { session: false }),
//   validation.gameExists,
//   gameController.joinGame
// )
// router.post(
//   '/games/:id/start',
//   passport.authenticate('basic', { session: false }),
//   validation.gameExists,
//   policy.hasGameAccess,
//   gameController.startGame
// )
// router.post(
//   '/games/:id/bet',
//   passport.authenticate('basic', { session: false }),
//   validation.gameExists,
//   policy.hasGameAccess,
//   gameController.placeBet
// )
// router.post(
//   '/games/:id/hit',
//   passport.authenticate('basic', { session: false }),
//   validation.gameExists,
//   policy.hasGameAccess,
//   gameController.drawCard
// )
// router.post(
//   '/games/:id/stay',
//   passport.authenticate('basic', { session: false }),
//   validation.gameExists,
//   policy.hasGameAccess,
//   gameController.stay
// )

export default router
