import { Request, Response, NextFunction } from 'express'
import { injectable } from 'inversify'
import { BaseMiddleware } from 'inversify-express-utils'

import { config } from '../config/index.js'
import { validateSignature } from '../utils/index.js'
import { ForbiddenError, InternalServerError } from '../models/index.js'

/** 
 * 檢查 Line Message 數位簽章
 */
@injectable()
export class ValidateLineSignature extends BaseMiddleware {
  private readonly _config: typeof config

  constructor() {
    super()
    this._config = config
  }

  public handler(
    req: Request,
    res: Response,
    next: NextFunction
  ): void {
    try {
      // 從 config 取得 channel secret
      const secret = this._config.LINE_CHANNEL_SECRET
      if (!secret) {
        throw new InternalServerError('Line channel secret 不存在')
      }

      // 從 HTTP headers 取得簽章
      let signature = req.headers['x-line-signature']
      if (Array.isArray(signature)) { signature = signature[0] }

      // 比對簽章
      if (!signature || !validateSignature(req.body, secret, signature)) {
        // return next() // debug
        console.warn(new Date().toISOString(), '攔截到一筆簽章無效的 HTTP 請求')
        throw new ForbiddenError('未授權行為')
      }

      next()
    } catch (error) {
      next(error)
    }
  }
}
