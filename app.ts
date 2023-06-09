#!/usr/bin/env node

import 'reflect-metadata'

import cors from 'cors'
import Debug from 'debug'
import express from 'express'
import { InversifyExpressServer } from 'inversify-express-utils'
import logger from 'morgan'
import http from 'node:http'
import os from 'node:os'
import path from 'node:path'

import { config } from './config/index.js'
import './controllers/index.js'
import { httpRequestLogger, notFoundHandler, clientErrorHandler, internalServerErrorHandler } from './middlewares/index.js'
import { getEndpointInfo, setEndpointUrl, testEndpoint } from './utils/lineMessage.js'
import { container } from './inversify.config.js'

// 註冊服務
const port = config.APP_PORT
const debug = Debug('http')
const builder = new InversifyExpressServer(container)

// 設定路由前中間件
builder.setConfig(app => {
  app.use(logger('dev'))
  app.use(express.static(path.join(process.cwd(), 'public')))
  app.use(express.urlencoded({ extended: false }))
  app.use(express.json({ limit: '2mb' }))
  app.use('/api', cors())
  app.use('/api', httpRequestLogger)
})

// 設定路由後中間件
builder.setErrorConfig(app => {
  app.use(notFoundHandler)
  app.use(clientErrorHandler)
  app.use(internalServerErrorHandler)
})

// 建立 express 應用與 HTTP 伺服器
const app = builder.build()
const server = http.createServer(app)

// 伺服器啟動時執行
server.listen(port, async () => {
  // 取得狀態並回報
  console.log('processArgv:', process.argv)
  console.log('numCPUs:', os.cpus().length)
  console.log(new Date().toISOString(), `server is listening on port ${port}`)

  const addr = server.address()
  const bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr?.port
  debug('Listening on ' + bind)

  // 檢查與更新 Line endpoint
  const response = await getEndpointInfo()
  const endpoint = `${config.APP_URL}/webhook`
  if (!response.data.active || response.data.endpoint !== endpoint) {
    console.log(new Date().toISOString(), 'Update Line endpoint.')
    // 更新 endpoint 並測試
    await setEndpointUrl(endpoint)
    const response = await testEndpoint(endpoint)
    console.log(response.data)
  }
})

// 伺服器錯誤處理
server.on('error', (error: NodeJS.ErrnoException) => {
  if (error.syscall !== 'listen') {
    throw error
  }

  const bind = typeof port === 'string'
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
})

// 接收到程序終止訊號
process.on('SIGTERM', () => {
  console.log('SIGTERM signal received: closing HTTP server')
  server.close(() => {
    console.log('HTTP server closed')
  })
})

process.on('SIGINT', () => process.exit())
