import http from 'http'
import socket from './socket'
import app from './app'

const httpServer = http.createServer(app.callback())
socket(httpServer)

httpServer.listen(4001, () => console.log('listening on 4001'))
