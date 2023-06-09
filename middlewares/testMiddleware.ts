import { Request, Response, NextFunction } from 'express'
import { injectable } from 'inversify'
import { BaseMiddleware } from 'inversify-express-utils'

@injectable()
export class TestMiddleware extends BaseMiddleware {
  public handler(
    req: Request,
    res: Response,
    next: NextFunction
  ): void {
    console.time('Test')
    next()
    console.timeEnd('Test')
  }
}
