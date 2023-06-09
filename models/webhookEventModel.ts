/**
 * Webhook 事件清單
 */
export class WebhookEventList<T extends BaseWebhookEvent> {
  public events: T[]
}

/**
 * Webhook 事件基本類別
 */
export class BaseWebhookEvent {
  /**
   * 事件類型
   */
  public type: string
}
