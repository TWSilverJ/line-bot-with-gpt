import { Line, LineDto } from '../models/index.js'

export interface ILineRepository {
  /**
   * 建立 Line 實例
   * @param data Line 資料傳遞物件
   */
  createLineAsync(data: LineDto): Promise<Line>

  /**
   * 取得 Line 清單
   */
  getLineListAsync(): Promise<Line[]>

  /**
   * 取得 Line
   * @param id Line UUID
   * @param includeSoftDeleted 是否包含已刪除項目
   */
  getLineByIdAsync(id: string, includeSoftDeleted?: boolean): Promise<Line | null>

  /**
   * 取得 Line
   * @param userId Line user ID
   * @param includeSoftDeleted 是否包含已刪除項目
   */
  getLineByUserIdAsync(userId: string, includeSoftDeleted?: boolean): Promise<Line | null>

  /**
   * 更新 Line
   * @param id Line UUID
   * @param data Line 資料傳遞物件
   */
  updateLineAsync(id: string, data: LineDto): Promise<number>

  /**
   * 刪除 Line
   * @param id Line UUID
   * @param force 是否強制刪除
   */
  deleteLineAsync(id: string, force?: boolean): Promise<number>
}
