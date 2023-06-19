import { BaseWebhookEvent } from './baseModel.js'

/**
 * Line webhook 事件清單
 */
export class LineWebhookEventList<T extends BaseLineWebhookEvent> {
  /**
   * User ID of a bot that should receive webhook events. The user ID value is a string that matches the regular expression, U[0-9a-f]{32}.
   */
  public destination: string

  /**
   * Array of webhook event objects. The LINE Platform may send an empty array that doesn't include a webhook event object to confirm communication.
   */
  public events: T[]
}

/**
 * Line webhook 事件基本類別
 */
export abstract class BaseLineWebhookEvent extends BaseWebhookEvent {
  /**
   * Channel state.
   */
  public mode: 'active' | 'standby'

  /**
   * Time of the event in milliseconds. Even in the case of a redelivered webhook, it represents the time the event occurred, not the time it was redelivered.
   */
  public timestamp: number

  /**
   * Source user, group chat, or multi-person chat object with information about the source of the event.
   */
  public source?: LineWebhookEventSource

  /**
   * Webhook Event ID. An ID that uniquely identifies a webhook event. This is a string in ULID format.
   */
  public webhookEventId: string

  /**
   * Whether the webhook event is a redelivered one or not. For more information, see Redelivered webhooks.
   */
  public deliveryContext: DeliveryContext
}

class DeliveryContext {
  public isRedelivery: boolean
}

/**
 * Line webhook 事件來源
 */
class LineWebhookEventSource {
  public type: 'user' | 'group' | 'room'
  public userId?: string
  public groupId?: string
  public roomId?: string
}

/**
 * Line webhook message 事件
 */
export class LineWebhookMessageEvent extends BaseLineWebhookEvent {
  public type = 'message'
  public replyToken: string
  public message: LineWebhookMessageEventMessage
}

/**
 * Line webhook message 事件內容
 */
export class LineWebhookMessageEventMessage {
  public id: string
  public type: 'text' | 'image' | 'video'
  public text?: string
  public emojis?: any[]
  public mention?: any
  public image?: string
  public video?: string
}

/**
 * Line webhook follow 事件
 */
export class LineWebhookFollowEvent extends BaseLineWebhookEvent {
  public type = 'follow'
}

/**
 * Line webhook unfollow 事件
 */
export class LineWebhookUnfollowEvent extends BaseLineWebhookEvent {
  public type = 'unfollow'
}
