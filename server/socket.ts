import http from 'http'
import { Server, Socket } from 'socket.io'
import * as authService from './services/auth'
import * as gameService from './services/game'
import { GAME_EVENT } from './constants'
import { ExtendedSocket, SocketGamePayload } from './interfaces'
import { User } from './models/User'
import { Game } from './models/Game'

const validateGameAndAccessToIt = ({
  socket,
  event,
  user,
  callback
} : {
  socket: Socket,
  event: GAME_EVENT,
  user: User,
  callback: (payload: SocketGamePayload, game: Game) => void
}) =>
  (payload: SocketGamePayload) => {
    const gameExistsResult = gameService.checkGameExists(payload.gameId)

    if (!gameExistsResult.success) {
      socket.emit(GAME_EVENT.FAIL, gameExistsResult.message)
      return
    }

    const gameAccessResult = gameService.validateAccessToGame({
      game: gameExistsResult.data,
      user,
      event,
      payload
    })

    if (!gameAccessResult.success) {
      socket.emit(GAME_EVENT.FAIL, gameAccessResult.message)
      return
    }

    callback(payload, gameExistsResult.data)
  }

export default (httpServer: http.Server) => {
  const io = new Server(httpServer, {
    cors: {
      origin: 'http://192.168.100.18:3000'
    }
  })

  io.use((socket: ExtendedSocket, next) => {
    const headers = socket.handshake.headers as { authorization?: string }
    const { authorization } = headers

    if (!authorization) {
      socket.disconnect(true)
    }

    const token = authorization.split(' ')[1]
    const [username, password] = Buffer.from(token, 'base64').toString('ascii').split(':')

    const user = authService.validateUser(username, password)

    if (!user) {
      socket.disconnect(true)
    }

    socket.user = user
    next()
  })

  io.on('connection', (socket: ExtendedSocket) => {
    const { user } = socket

    const runningGame = gameService.getUserGame(user)
    if (runningGame) {
      socket.join(runningGame.id)
      io.in(runningGame.id).emit(GAME_EVENT.UPDATE, runningGame.serialize())
    }

    socket.on(GAME_EVENT.CREATE, () => {
      const game = gameService.createGame(user)

      if (game) {
        socket.join(game.id)
        io.in(game.id).emit(GAME_EVENT.UPDATE, game.serialize())
      } else {
        socket.emit(GAME_EVENT.FAIL, 'Insufficient funds')
      }
    })

    socket.on(GAME_EVENT.JOIN, validateGameAndAccessToIt({
      socket,
      event: GAME_EVENT.JOIN,
      user,
      callback: ({ gameId }, game) => {
        socket.join(gameId)
        const updatedGame = gameService.addPlayerToGame(game, user)
        io.in(gameId).emit(GAME_EVENT.UPDATE, updatedGame.serialize())
      }
    }))

    socket.on(GAME_EVENT.START, validateGameAndAccessToIt({
      socket,
      event: GAME_EVENT.START,
      user,
      callback: ({ gameId }, game) => {
        const updatedGame = gameService.startGame(game)
        io.in(gameId).emit(GAME_EVENT.UPDATE, updatedGame.serialize())
      }
    }))

    socket.on(GAME_EVENT.BET, validateGameAndAccessToIt({
      socket,
      event: GAME_EVENT.BET,
      user,
      callback: ({ gameId, betSum }, game) => {
        const updatedGame = gameService.placeBet(game, user, betSum)
        io.in(gameId).emit(GAME_EVENT.UPDATE, updatedGame.serialize())
      }
    }))

    socket.on(GAME_EVENT.HIT, validateGameAndAccessToIt({
      socket,
      event: GAME_EVENT.HIT,
      user,
      callback: ({ gameId }, game) => {
        const updatedGame = gameService.drawCard(game, user)
        io.in(gameId).emit(GAME_EVENT.UPDATE, updatedGame.serialize())
      }
    }))

    socket.on(GAME_EVENT.STAY, validateGameAndAccessToIt({
      socket,
      event: GAME_EVENT.STAY,
      user,
      callback: ({ gameId }, game) => {
        const updatedGame = gameService.finishTurn(game, user)
        io.in(gameId).emit(GAME_EVENT.UPDATE, updatedGame.serialize())
      }
    }))

    socket.on(GAME_EVENT.LEAVE, validateGameAndAccessToIt({
      socket,
      event: GAME_EVENT.LEAVE,
      user,
      callback: ({ gameId }, game) => {
        const updatedGame = gameService.leaveGame(game, user)
        socket.to(gameId).emit(GAME_EVENT.UPDATE, updatedGame.serialize())
        socket.leave(gameId)
      }
    }))

    socket.on('disconnect', () => {
      console.log('4toby 4to')
      const game = gameService.getUserGame(user)
      if (game) {
        const updatedGame = gameService.leaveGame(game, user)
        socket.leave(game.id)
        socket.to(game.id).emit(GAME_EVENT.UPDATE, updatedGame.serialize())
      }
    })
  })

  return io
}
