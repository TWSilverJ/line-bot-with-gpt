import { injectable, inject } from 'inversify'

import { TYPES } from '../config/index.js'
import { ILineRepository } from '../interfaces/index.js'
import { Line, LineDto, LineMessage, LineMessageDto } from '../models/index.js'
import * as models from '../sequelize/index.js'

@injectable()
export class LineRepository implements ILineRepository {
  @inject(TYPES.Model)
  private readonly _models: typeof models

  // Line
  /**
   * 建立 Line 實例
  */
  private _createLineEntity(data: models.Line): Line {
    const line = new Line(data.id, data.createdAt)
    line.userId = data.userId
    line.displayName = data.displayName
    line.pictureUrl = data.pictureUrl
    line.statusMessage = data.statusMessage
    line.language = data.language
    line.updatedAt = data.updatedAt
    line.deletedAt = data.deletedAt
    return line
  }

  public async createLineAsync(data: LineDto): Promise<Line> {
    // 寫入資料庫
    const item = await this._models.Line.create(data as any)

    // 整理並輸出資料
    return this._createLineEntity(item)
  }

  public async getLineListAsync(): Promise<Line[]> {
    // 資料庫查詢
    const list = await this._models.Line.findAll()

    // 整理並輸出資料
    return list.map(item => this._createLineEntity(item))
  }

  public async getLineByIdAsync(id: string, includeSoftDeleted?: boolean): Promise<Line | null> {
    // 資料庫查詢
    const item = await this._models.Line.findByPk(id, {
      paranoid: !includeSoftDeleted
    })

    // 整理並輸出資料
    return item ? this._createLineEntity(item) : item
  }

  public async getLineByUserIdAsync(userId: string, includeSoftDeleted?: boolean): Promise<Line | null> {
    // 資料庫查詢
    const item = await this._models.Line.findOne({
      where: { userId },
      paranoid: !includeSoftDeleted
    })

    // 整理並輸出資料
    return item ? this._createLineEntity(item) : item
  }

  public async updateLineAsync(id: string, data: LineDto): Promise<number> {
    // 檢查查詢條件
    if (!id) { return Promise.resolve(0) }

    // 操作資料庫
    const result = await this._models.Line.update(data as any, {
      fields: [
        'displayName',
        'pictureUrl',
        'statusMessage',
        'language',
        'deletedAt'
      ],
      where: { id }
    })

    // 整理並輸出資料
    return result[0]
  }

  public deleteLineAsync(id: string, force = false): Promise<number> {
    // 檢查查詢條件
    if (!id) { return Promise.resolve(0) }

    // 操作資料庫並輸出
    return this._models.Line.destroy({ where: { id }, force })
  }


  // LineMessage
  /**
   * 建立 LineMessage 實例
   * @param data 
   * @returns 
   */
  private _createLineMessageEntity(data: models.LineMessage): LineMessage {
    const lineMessage = new LineMessage(data.id, data.createdAt)
    lineMessage.userId = data.userId
    lineMessage.message = data.message
    lineMessage.reply = data.reply
    lineMessage.promptToken = data.promptToken
    lineMessage.completionToken = data.completionToken
    lineMessage.totalToken = data.totalToken
    lineMessage.updatedAt = data.updatedAt
    lineMessage.deletedAt = data.deletedAt
    return lineMessage
  }

  public async createLineMessageAsync(data: LineMessageDto): Promise<LineMessage> {
    // 寫入資料庫
    const item = await this._models.LineMessage.create(data as any)

    // 整理並輸出資料
    return this._createLineMessageEntity(item)
  }

  public async getLineMessageListByUserIdAsync(userId?: string): Promise<LineMessage[]> {
    // 資料庫查詢
    const list = await this._models.LineMessage.findAll({
      where: { userId },
      order: [
        ['createdAt', 'DESC']
      ],
      limit: 5
    })

    // 整理並輸出資料
    return list.map(item => this._createLineMessageEntity(item))
  }
}
