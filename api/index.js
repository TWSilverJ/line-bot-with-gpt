import express from 'express'
import logger from 'morgan'
import path from 'node:path'

import { lineMessageAPIConfig } from '../config/index.js'
import { validateSignature } from '../utils/index.js'
import { lineMessageService } from '../services/index.js'

// 初始化 express
export const app = express()

// 設定中間件
app.use(logger('dev'))
app.use(express.json({ limit: '2mb' }))
app.use(express.urlencoded({ extended: false }))
app.use(express.static(path.join(process.cwd(), 'public')))

// 路由
app.post('/webhook', async (req, res, next) => {
  // 從 config 取得 channel secret
  const secret = lineMessageAPIConfig.LINE_CHANNEL_SECRET
  if (!secret) { return next(new Error('Channel secret 不存在')) }

  // 從 HTTP headers 取得簽章
  let signature = req.headers['x-line-signature']
  if (Array.isArray(signature)) { signature = signature[0] }

  // 比對簽章
  if (!signature || !validateSignature(req.body, secret, signature)) {
    // return next() // debug
    console.warn(new Date().toISOString(), '攔截到一筆簽章無效的 HTTP 請求')
    return res.status(400).json({ code: 400, message: '簽章無效' })
  }

  // 測試回覆
  if (!Object.entries(req.body).length || !req.body.events.length) {
    return res.status(200).json({ code: 200, message: 'Test succeeded.' })
  }

  // 事件處理
  const errors = []
  for (const event of req.body.events) {
    res.status(202).json({ code: 202, message: 'Message received.' })
    console.log(event)
    try {
      await lineMessageService.replyMessage(event.replyToken, {
        type: 'text',
        text: event.message.text
      })
    } catch (error) {
      errors.push(errors)
    }
  }

  if (errors.length) { next(new Error(`遇到 ${errors.length} 筆錯誤`)) }
})

// 錯誤處理
app.use((err, req, res, next) => {
  console.error(new Date().toISOString(), err.message, {
    ip: req.ips.length ? req.ips : req.ip,
    protocol: req.protocol,
    method: req.method,
    url: req.originalUrl
  })
  console.error(err.stack)
  // 如果已經回應就跳過
  if (res.headersSent) { return next(err) }
  // 回覆文字
  res.status(500).send('Something broke!')
})
