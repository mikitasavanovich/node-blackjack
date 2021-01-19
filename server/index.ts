import http from 'http'
import { Server } from 'socket.io'
import app from './app'

const httpServer = http.createServer(app.callback())
const io = new Server(httpServer)

httpServer.listen(4001, () => console.log('listening on 4001'))
