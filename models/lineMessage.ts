export class LineMessage {
  /**
   * @type {string}
   */
  public id: string

  /**
   * @type {string}
   */
  public userId: string

  /**
   * @type {string}
   */
  public message: string

  /**
   * @type {string}
   */
  public reply: string

  /**
   * @type {number}
   */
  public promptToken: number

  /**
   * @type {number}
   */
  public completionToken: number

  /**
   * @type {number}
   */
  public totalToken: number

  /**
   * @param {any} input 
   */
  constructor(input: any) {
    this.id = input.id
    this.userId = input.userId
    this.message = input.message
    this.reply = input.reply
    this.promptToken = input.promptToken
    this.completionToken = input.completionToken
    this.totalToken = input.totalToken
  }
}
