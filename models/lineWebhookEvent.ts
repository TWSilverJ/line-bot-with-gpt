import { BaseWebhookEvent } from './webhookEventModel.js'

/**
 * Line webhook 事件基本類別
 */
export abstract class LineBaseWebhookEvent extends BaseWebhookEvent {
  public mode: 'active' | 'standby'
  public timestamp: number
  public source?: LineWebhookEventSource
  public webhookEventId: string
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
export class LineWebhookMessageEvent extends LineBaseWebhookEvent {
  public type = 'message'
  public replyToken: string
  public message: LineWebhookEventMessage
}

/**
 * Line webhook message 事件內容
 */
export class LineWebhookEventMessage {
  public type: 'text' | 'image' | 'video'
  public text?: string
  public image?: string
  public video?: string
}

/**
 * Line webhook follow 事件
 */
export class LineWebhookFollowEvent extends LineBaseWebhookEvent {
  public type = 'follow'
}

/**
 * Line webhook unfollow 事件
 */
export class LineWebhookUnfollowEvent extends LineBaseWebhookEvent {
  public type = 'unfollow'
}
