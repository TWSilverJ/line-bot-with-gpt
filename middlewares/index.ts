import { Request, Response, NextFunction } from 'express'

import { config } from '../config/index.js'
import { HttpError, NotFoundError } from '../models/index.js'

export * from './validateLineSignature.js'

/**
 * 取得 HTTP request log
 * @param req 
 * @param res 
 * @param next 
 */
export const httpRequestLogger = async (req: Request, res: Response, next: NextFunction) => {
  // debug
  // console.log('ips', req.ips)
  // console.log('ip', req.ip)
  // console.log('remoteAddress', req.connection.remoteAddress)
  // 取得 HTTP 請求記錄
  console.time(`${req.method} ${req.originalUrl}`)
  const now = new Date().toISOString()
  console.log(now, 'HTTP request.', {
    time: now,
    protocol: req.protocol,
    method: req.method,
    url: req.originalUrl,
    ip: req.ips.length ? req.ips : req.ip,
    xForwardedFor: req.headers['x-forwarded-for'],
    userAgent: req.headers['user-agent'],
    contentType: req.headers['content-type'],
    // body: JSON.stringify(req.body)
  })
  next()
  console.timeEnd(`${req.method} ${req.originalUrl}`)
  // 從反向代理中，取得使用者 IP 位置
  // function getClientIP(req) {
  //     const xForwardedFor = req.headers['x-forwarded-for']
  //     if (xForwardedFor) {
  //         const list = xForwardedFor.split(',');
  //         return list[list.length - 1].trim();
  //     } else if (req.connection && req?.connection?.remoteAddress) {
  //         return req.connection.remoteAddress;
  //     } else if (req.socket && req.socket.remoteAddress) {
  //         return req.socket.remoteAddress;
  //     } else if (req.connection && req.connection.socket && req.connection.socket.remoteAddress) {
  //         return req.connection.socket.remoteAddress;
  //     } else {
  //         return null;
  //     }
  // }
}

/**
 * 處理未配對路由
 * @param error 
 * @param req 
 * @param res 
 * @param next 
 */
export const notFoundHandler = (req: Request, res: Response, next: NextFunction) => {
  if (!res.headersSent) {
    const error = new NotFoundError('找不到路由')
    next(error)
  }
}

/**
 * 請求端錯誤處理
 * @param error 
 * @param req 
 * @param res 
 * @param next 
 */
export const clientErrorHandler = (error: Error, req: Request, res: Response, next: NextFunction) => {
  // 還沒回覆則回覆錯誤
  if (error instanceof HttpError && error.code >= 400 && error.code < 500 && !res.headersSent) {
    res.status(error.code).json(error)
  } else {
    next(error)
  }
}

/**
 * 伺服器端錯誤處理
 * @param error 
 * @param req 
 * @param res 
 * @param next 
 * @returns 
 */
export const internalServerErrorHandler = (error: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(new Date().toISOString(), error.message)
  console.error(error.stack)

  // 已經回覆則跳過
  if (res.headersSent) { return next(error) }

  // 如果為除錯模式，回傳詳細錯誤
  if (config.APP_DEBUG && error instanceof HttpError) {
    res.status(error.code).json(error)
  } else {
    res.status(500).json({ code: 500, message: 'Something broke!' })
  }
}
