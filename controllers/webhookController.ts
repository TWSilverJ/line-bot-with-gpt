import { Response } from 'express'
import { inject } from 'inversify'
import { BaseHttpController, controller, httpPost, requestBody, response } from 'inversify-express-utils'

import { TYPES } from '../config/index.js'
import { IWebhookEventHandler } from '../interfaces/index.js'
import { LineWebhookBaseEvent, LineWebhookEventList } from '../models/index.js'

@controller('/webhook')
export class WebhookController extends BaseHttpController {
  @inject(TYPES.LineEventHandlerFactory)
  private readonly _lineEventHandlerFactory: () => IWebhookEventHandler

  @httpPost('/', TYPES.ValidateLineSignatureMiddleware)
  public async lineWebhook(
    @requestBody() body: LineWebhookEventList<LineWebhookBaseEvent>,
    @response() res: Response
  ) {
    // 回覆訊息
    res.status(200).json()

    // 事件中繼：多事件處理
    for (const event of body.events) {
      try {
        const eventHandler = this._lineEventHandlerFactory()
        await eventHandler.handler(event)
      } catch (error: any) {
        console.error(error)
        console.error(error.response.data)
      }
    }
  }
}
