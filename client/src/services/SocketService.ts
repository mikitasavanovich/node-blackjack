import io from 'socket.io-client'
import { BASE_API_URL, GAME_EVENT } from '../constants'
import { IGame, ISocketGamePayload } from '../interfaces'

class SocketService {
  socket: SocketIOClient.Socket | null = null

  public new(token: string) {
    this.socket = io(BASE_API_URL, {
      reconnectionAttempts: 0,
      transportOptions: {
        polling: {
          extraHeaders: {
            'Authorization': `Basic ${token}`
          }
        }
      }
    })
  }

  public onUpdateEvent(handler: (payload: IGame) => void) {
    this.socket?.on(GAME_EVENT.UPDATE, handler)
  }

  public emitGameEvent(event: GAME_EVENT, payload: ISocketGamePayload) {
    this.socket?.emit(event, payload)
  }

  public disconnect() {
    this.socket = null
  }
}

export default new SocketService()