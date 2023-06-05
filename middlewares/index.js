import { lineMessageAPIConfig } from '../config/index.js'
import { validateSignature } from '../utils/index.js'

/**
 * 檢查 Line 事件數位簽章
 * @param {import('express').Request} req 
 * @param {import('express').Response} res 
 * @param {import('express').NextFunction} next 
 * @returns 
 */
export const validateLineSignature = (req, res, next) => {
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
    return res.status(403).json({ code: 403, message: '未授權' })
  }

  next()
}

/**
 * 錯誤處理
 * @param {Error} err 
 * @param {import('express').Request} req 
 * @param {import('express').Response} res 
 * @param {import('express').NextFunction} next 
 * @returns 
 */
export const errorHandler = (err, req, res, next) => {
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
}