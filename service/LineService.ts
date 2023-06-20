import { inject, injectable } from 'inversify'

import { TYPES, config } from '../config/index.js'
import { ILineRepository, ILineService } from '../interfaces/index.js'
import { Line, LineDto, LineEvent, LineMessage, LineMessageApi, LineMessageDto, LineWebhookBaseEvent } from '../models/index.js'

@injectable()
export class LineService implements ILineService {
  @inject(TYPES.Config)
  private readonly _config: typeof config

  @inject(TYPES.LineRepository)
  private readonly _linerepository: ILineRepository

  // Line
  public async createOrUpdateFollowerAsync(userId: string): Promise<Line> {
    // 取得 Line 資料
    const lineMessageAPI = new LineMessageApi(this._config.LINE_CHANNEL_ACCESS_TOKEN)
    const response = await lineMessageAPI.getProfile(userId)

    // 建立傳遞物件
    const lineDto = new LineDto()
    lineDto.userId = response.data.userId
    lineDto.displayName = response.data.displayName
    lineDto.pictureUrl = response.data.pictureUrl
    lineDto.statusMessage = response.data.statusMessage
    lineDto.language = response.data.language
    lineDto.deletedAt = null

    // 建立或更新 Line
    let line = await this._linerepository.getLineByUserIdAsync(userId, true)
    if (line) {
      await this._linerepository.updateLineAsync(line.id, lineDto)
      line = await this._linerepository.getLineByIdAsync(line.id)
    } else {
      line = await this._linerepository.createLineAsync(lineDto)
    }
    return line!
  }

  public async deleteFollowerAsync(userId: string): Promise<void> {
    const exist = await this._linerepository.getLineByUserIdAsync(userId)
    if (exist) {
      await this._linerepository.deleteLineAsync(exist.id)
    }
  }


  // Line event
  public async storeLineEvent(event: LineWebhookBaseEvent): Promise<LineEvent> {
    console.log(event)
    return new LineEvent('', new Date())
  }

  // Line message
  public storeLineMessageAsync(data: LineMessageDto): Promise<LineMessage> {
    return this._linerepository.createLineMessageAsync(data)
  }

  public getLineMessageAsync(userId: string): Promise<LineMessage[]> {
    return this._linerepository.getLineMessageListByUserIdAsync(userId)
  }
}
