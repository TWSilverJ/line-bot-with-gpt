import { BaseDtoModel } from './baseModel.js'

export class LineDto extends BaseDtoModel {
  public userId?: string
  public displayName?: string
  public pictureUrl?: string | null
  public statusMessage?: string | null
  public language?: string | null
}

export class LineEventDto extends BaseDtoModel {
  public type: string | 'follow' | 'unfollow' | 'message'
  public webhookEventId: string
  public timestamp: Date
  public source?: LineEventSourceDto
  public replyToken?: string
  public message?: any
}

export class LineEventSourceDto extends BaseDtoModel {
  public type: 'user' | 'group' | 'room'
  public userId?: string
  public roomId?: string
  public groupId?: string
}

export class LineEventMessageDto extends BaseDtoModel { 
  public type: 'text' | 'group' | 'room'
}
