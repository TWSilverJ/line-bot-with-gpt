import { Response } from 'express'
import { BaseHttpController, controller, httpPost, requestBody, response } from 'inversify-express-utils'

import { config, TYPES } from '../config/index.js'
import { InternalServerError, BaseLineWebhookEvent, LineWebhookMessageEvent, WebhookEventList } from '../models/index.js'
import { createTextCompletion, sendReplyMessage } from '../utils/index.js'

@controller('/webhook')
export class WebhookController extends BaseHttpController {
  @httpPost('/', TYPES.ValidateLineSignature)
  public async lineWebhook(
    @requestBody() body: WebhookEventList<BaseLineWebhookEvent>,
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
      // 只處理直接對話的 message 事件
      if (event.type === 'message' && event.source?.type === 'user') {
        const messageEvent = event as LineWebhookMessageEvent

        // 取出訊息
        const text = messageEvent.message.text || ''

        // OpenAI 請求
        const prompt: any = {
          model: config.OPENAI_COMPLETION_MODEL,
          maxTokens: 500,
          temperature: 0.5,
          top_p: 0.3,
          stop: [
            '\nuser:',
            '\nassistant:',
            '\n<END>'
          ],
          prompt: `user: ${text}\nassistant:`
        }
        const response = await createTextCompletion(prompt)

        // 回覆訊息
        const message = {
          type: 'text',
          text: response.data.choices[0].text.trim()
        }
        await sendReplyMessage({
          replyToken: messageEvent.replyToken,
          messages: [message]
        })
      }
    }

    // 錯誤回報
    if (errors.length) {
      throw new InternalServerError(`遇到 ${errors.length} 筆錯誤`, errors)
    }
  }
}
