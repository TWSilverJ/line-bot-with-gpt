export class LineMessage {
  /**
   * @type {string}
   */
  id

  /**
   * @type {string}
   */
  userId

  /**
   * @type {string}
   */
  message

  /**
   * @type {string}
   */
  reply

  /**
   * @type {number}
   */
  promptToken

  /**
   * @type {number}
   */
  completionToken

  /**
   * @type {number}
   */
  totalToken

  /**
   * @param {any} input 
   */
  constructor(input) {
    this.id = input.id
    this.userId = input.userId
    this.message = input.message
    this.reply = input.reply
    this.promptToken = input.promptToken
    this.completionToken = input.completionToken
    this.totalToken = input.totalToken
  }
}
