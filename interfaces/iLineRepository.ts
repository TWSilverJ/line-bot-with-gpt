import { Line, LineDto, LineMessage, LineMessageDto } from '../models/index.js'

export interface ILineRepository {
  // Line
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


  // Line message
  /**
   * 建立訊息記錄
   * @param data Line message 資料傳遞物件
   */
  createLineMessageAsync(data:LineMessageDto):Promise<LineMessage>

  /**
   * 取得訊息記錄清單
   * @param userId Line user ID
   */
  getLineMessageListByUserIdAsync(userId?:string):Promise<LineMessage[]>
}
