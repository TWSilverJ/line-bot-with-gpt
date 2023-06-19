import { injectable, inject } from 'inversify'
import { Identifier } from 'sequelize'

import { TYPES } from '../config/index.js'
import { ILineRepository } from '../interfaces/index.js'
import { Line, LineDto, LineMessage } from '../models/index.js'
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
}


/**
 * List user Line message
 * @param {string} userId 
 */
export async function listMessage(userId: any) {
  const list = await models.LineMessage.findAll({
    where: { userId },
    order: [
      ['createdAt', 'DESC']
    ],
    limit: 5
  })
  return list.map(item => new LineMessage(item))
}

/**
 * Create Line message
 * @param {Object} data
 * @param {string} data.userId
 * @param {string} data.message
 */
export async function createMessage(data: { userId: any; message: any }) {
  const test: any = {
    userId: data.userId,
    message: data.message
  }
  const item = await models.LineMessage.create(test)
  return new LineMessage(item)
}

/**
 * Read Line
 * @param {string} id
 */
export async function readMessage(id: Identifier | undefined) {
  const item = await models.LineMessage.findByPk(id)
  return item ? new LineMessage(item) : null
}

/**
 * Update Line
 * @param {string} id
 * @param {Object} data
 * @param {string | undefined} data.reply
 * @param {number | undefined} data.promptToken
 * @param {number | undefined} data.completionToken
 * @param {number | undefined} data.totalToken
 */
export function updateMessage(id: string, data: { reply: any; promptToken: any; completionToken: any; totalToken: any }) {
  return models.LineMessage.update({
    reply: data.reply,
    promptToken: data.promptToken,
    completionToken: data.completionToken,
    totalToken: data.totalToken
  }, {
    where: { id }
  })
}
