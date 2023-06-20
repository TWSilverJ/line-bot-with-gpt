import { inject, injectable } from 'inversify'

import { TYPES, config } from '../config/index.js'
import { ILineService, IWebhookEventHandler } from '../interfaces/index.js'
import { LineMessageEvent } from '../models/index.js'

@injectable()
export class LineMessageEventHandler implements IWebhookEventHandler {
  @inject(TYPES.Config)
  private readonly _config: typeof config

  @inject(TYPES.LineService)
  private readonly _lineService: ILineService

  public async handler(event: LineMessageEvent): Promise<void> {
    // 處理事件
    switch (event.message.type) {
      case 'text':
        await this.textMessageEvent(event)
        break

      default:
        throw Error(`未定義訊息種類： ${event.message.type}`)
    }
  }

  /**
   * 文字訊息事件
   * @param event 訊息事件
   */
  private async textMessageEvent(event: LineMessageEvent): Promise<void> { }
}
