import { Response } from 'express'
import { BaseHttpController, controller, httpPost, requestBody, response } from 'inversify-express-utils'

import { InternalServerError, LineBaseWebhookEvent, WebhookEventList } from '../models/index.js'
import { TYPES } from '../types.js'

@controller('/webhook')
export class WebhookController extends BaseHttpController {
  @httpPost('/line', TYPES.ValidateLineSignature)
  public lineWebhook(
    @requestBody() body: WebhookEventList<LineBaseWebhookEvent>,
    @response() res: Response
  ) {
    // 回覆訊息
    if (!Object.entries(body).length || !body.events.length) {
      res.status(200).json({ code: 200, message: 'Test succeeded.' })
    } else {
      res.status(202).json({ code: 202, message: 'Message received.' })
    }

    // 事件中繼：多事件處理
    const errors: Error[] = []
    for (const event of body.events) {
      console.log(event)
      // try {
      //   const lineMessageEventHandler = container.get()
      //   await lineMessageEventHandler.handlerAsync(event)
      // } catch (error) {
      //   const message = error.response?.data?.error?.message ? error.response.data.error.message : error.message
      //   console.error(message)
      //   errors.push(error)
      // }
    }

    // 錯誤回報
    if (errors.length) {
      throw new InternalServerError(`遇到 ${errors.length} 筆錯誤`, errors)
    }
  }
}
