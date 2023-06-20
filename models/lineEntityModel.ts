import { BaseEntityModel } from './baseModel.js'

export class Line extends BaseEntityModel {
  public userId: string
  public displayName: string
  public pictureUrl: string | null
  public statusMessage: string | null
  public language: string | null
}

export const EVENT_TYPE_MESSAGE = 'message'

export const SOURCE_TYPE_GROUP = 'group'
export const SOURCE_TYPE_MULTI_PERSON = 'room'
export const SOURCE_TYPE_USER = 'user'

export const MESSAGE_TYPE_TEXT = 'text'

export const ACTION_TYPE_MESSAGE = 'message'

export class LineEvent extends BaseEntityModel {
  /**
   * 事件種類
   */
  public type: string

  /**
   * 回覆令牌
   */
  public replyToken: string

  public source: any

  public message: any


  /**
   * @returns {boolean}
   */
  public get isMessage() {
    return this.type === EVENT_TYPE_MESSAGE
  }

  /**
   * @returns {boolean}
   */
  public get isGroup() {
    return this.source.type === SOURCE_TYPE_GROUP
  }

  /**
   * @returns {boolean}
   */
  public get isUser() {
    return this.source.type === SOURCE_TYPE_USER
  }

  /**
   * @returns {boolean}
   */
  public get isText() {
    return this.message.type === MESSAGE_TYPE_TEXT
  }

  /**
   * @returns {string}
   */
  public get groupId() {
    return this.source.groupId
  }

  /**
   * @returns {string}
   */
  public get userId() {
    return this.source.userId
  }

  /**
   * 訊息 ID
   * @returns {string}
   */
  public get messageId() {
    return this.message.id
  }

  /**
   * 訊息內容
   * @returns {string}
   */
  public get text() {
    return this.message.text
  }
}

export class LineMessage extends BaseEntityModel {
  public userId: string
  public message: string
  public reply: string
  public promptToken: number
  public completionToken: number
  public totalToken: number
}
