import express from 'express'
import logger from 'morgan'
import path from 'node:path'

import { lineMessageEventHandler } from '../handlers/index.js'
import { errorHandler, validateLineSignature } from '../middlewares/index.js'

// 初始化 express
const app = express()

// 路由前中間件
app.use(logger('dev'))
app.use(express.json({ limit: '2mb' }))
app.use(express.urlencoded({ extended: false }))
app.use(express.static(path.join(process.cwd(), 'public')))

// 路由
app.post('/webhook', validateLineSignature, async (req, res, next) => {
  // 回覆訊息
  if (!Object.entries(req.body).length || !req.body.events.length) {
    res.status(200).json({ code: 200, message: 'Test succeeded.' })
  } else {
    res.status(202).json({ code: 202, message: 'Message received.' })
  }

  // 事件處理
  const errors = []
  for (const event of req.body.events) {
    try {
      await lineMessageEventHandler.handlerAsync(event)
    } catch (error) {
      console.error(error)
      errors.push(errors)
    }
  }

  // 錯誤回報
  if (errors.length) { next(new Error(`遇到 ${errors.length} 筆錯誤`)) }
})

// 路由後中間件
app.use(errorHandler)

// 模組輸出
export { app }
