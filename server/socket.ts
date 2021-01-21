import http from 'http'
import { Server } from 'socket.io'
import * as authService from './services/auth'
import * as gameService from './services/game'
import { GAME_EVENT } from './constants'
import { ExtendedSocket } from './interfaces'
import { User } from './models/User'

const validateGameAndAccessToIt = (data: { gameId: string, user: User, event: GAME_EVENT, betSum?: number }) => {
  const gameExistsResult = gameService.checkGameExists(data.gameId)

  if (!gameExistsResult.success) {
    return gameExistsResult
  }

  const gameAccessResult = gameService.validateAccessToGame({
    game: gameExistsResult.data,
    user: data.user,
    event: data.event,
    payload: { betSum: data.betSum }
  })

  if (!gameAccessResult.success) {
    return gameAccessResult
  }

  return gameExistsResult
}

export default (httpServer: http.Server) => {
  const io = new Server(httpServer, {
    cors: {
      origin: 'http://localhost:3000'
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

    socket.on(GAME_EVENT.JOIN, (gameId) => {
      const { data: game, message, success } = validateGameAndAccessToIt({ gameId, user, event: GAME_EVENT.JOIN })

      if (!success) {
        socket.emit(GAME_EVENT.FAIL, { message })
      }

      socket.join(gameId)
      const updatedGame = gameService.addPlayerToGame(game, user)
      socket.to(gameId).emit(GAME_EVENT.UPDATE, { game: updatedGame })
    })

    socket.on(GAME_EVENT.START, (gameId) => {
      const { data: game, message, success } = validateGameAndAccessToIt({ gameId, user, event: GAME_EVENT.START })

      if (!success) {
        socket.emit(GAME_EVENT.FAIL, { message })
      }

      const updatedGame = gameService.startGame(game)
      socket.to(gameId).emit(GAME_EVENT.UPDATE, { game: updatedGame })
    })

    socket.on(GAME_EVENT.BET, (gameId, sum) => {
      const { data: game, message, success } = validateGameAndAccessToIt({ gameId, user, event: GAME_EVENT.BET, betSum: sum })

      if (!success) {
        socket.emit(GAME_EVENT.FAIL, { message })
      }

      const updatedGame = gameService.placeBet(game, user, sum)
      socket.to(gameId).emit(GAME_EVENT.UPDATE, { game: updatedGame })
    })

    socket.on(GAME_EVENT.HIT, (gameId) => {
      const { data: game, message, success } = validateGameAndAccessToIt({ gameId, user, event: GAME_EVENT.HIT })

      if (!success) {
        socket.emit(GAME_EVENT.FAIL, { message })
      }

      const updatedGame = gameService.drawCard(game, user)
      socket.to(gameId).emit(GAME_EVENT.UPDATE, { game: updatedGame })
    })

    socket.on(GAME_EVENT.STAY, (gameId) => {
      const { data: game, message, success } = validateGameAndAccessToIt({ gameId, user, event: GAME_EVENT.STAY })

      if (!success) {
        socket.emit(GAME_EVENT.FAIL, { message })
      }

      const updatedGame = gameService.drawCard(game, user)
      socket.to(gameId).emit(GAME_EVENT.UPDATE, { game: updatedGame })
    })

    socket.on(GAME_EVENT.LEAVE, (gameId) => {
      const { data: game, message, success } = validateGameAndAccessToIt({ gameId, user, event: GAME_EVENT.LEAVE })

      if (!success) {
        socket.emit(GAME_EVENT.FAIL, { message })
      }

      const updatedGame = gameService.leaveGame(game, user)
      socket.to(gameId).emit(GAME_EVENT.UPDATE, { game: updatedGame })
      socket.leave(gameId)
    })

    socket.on('diconnecting', () => {
      const game = gameService.getUserGame(user)
      const updatedGame = gameService.leaveGame(game, user)
      socket.leave(game.id)
      socket.to(game.id).emit(GAME_EVENT.UPDATE, { game: updatedGame })
    })
  })

  return io
}
