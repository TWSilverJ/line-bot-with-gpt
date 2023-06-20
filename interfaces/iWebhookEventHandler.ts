import { BaseWebhookEvent } from '../models/baseModel.js'

export interface IWebhookEventHandler {
  /**
   * Webhook 事件處理
   * @param event Webhook event
   */
  handler(event: BaseWebhookEvent): Promise<void>
}
