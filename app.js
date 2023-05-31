#!/usr/bin/env node
import Debug from 'debug'
import http from 'node:http'

import { app } from './api/index.js'
import { appConfig } from './config/index.js'

// 建立 HTTP 伺服器
const port = appConfig.APP_PORT
const debug = Debug('http')
const server = http.createServer(app)
  .listen(port, () => { console.log(`server is listening on port ${port}`) })
  .on('error', onError)
  .on('listening', onListening)

// 監聽終止信號
process.on('SIGTERM', () => {
  debug('SIGTERM signal received: closing HTTP server')
  server.close(() => {
    debug('HTTP server closed')
  })
})

/**
* Event listener for HTTP server "error" event.
* @param {any} error
*/
function onError(error) {
  if (error.syscall !== 'listen') {
    throw error
  }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges')
      process.exit(1)
      break
    case 'EADDRINUSE':
      console.error(bind + ' is already in use')
      process.exit(1)
      break
    default:
      throw error
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */
function onListening() {
  var addr = server.address()
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port
  debug('Listening on ' + bind)
}
