export const EVENT_TYPE_MESSAGE = 'message'

export const SOURCE_TYPE_GROUP = 'group'
export const SOURCE_TYPE_MULTI_PERSON = 'room'
export const SOURCE_TYPE_USER = 'user'

export const MESSAGE_TYPE_TEXT = 'text'

export const ACTION_TYPE_MESSAGE = 'message'

export class LineEvent {
  type

  replyToken

  source

  message

  constructor({
    type,
    replyToken,
    source,
    message,
  }) {
    this.type = type
    this.replyToken = replyToken
    this.source = source
    this.message = message
  }

  /**
   * @returns {boolean}
   */
  get isMessage() {
    return this.type === EVENT_TYPE_MESSAGE
  }

  /**
   * @returns {boolean}
   */
  get isGroup() {
    return this.source.type === SOURCE_TYPE_GROUP
  }

  /**
   * @returns {boolean}
   */
  get isUser() {
    return this.source.type === SOURCE_TYPE_USER
  }

  /**
   * @returns {boolean}
   */
  get isText() {
    return this.message.type === MESSAGE_TYPE_TEXT
  }

  /**
   * @returns {string}
   */
  get groupId() {
    return this.source.groupId
  }

  /**
   * @returns {string}
   */
  get userId() {
    return this.source.userId
  }

  /**
   * 訊息 ID
   * @returns {string}
   */
  get messageId() {
    return this.message.id
  }

  /**
   * 訊息內容
   * @returns {string}
   */
  get text() {
    return this.message.text
  }
}
