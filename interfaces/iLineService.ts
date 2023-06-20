import { Line, LineWebhookBaseEvent, LineEvent, LineMessage, LineMessageDto } from '../models/index.js'

export interface ILineService {
  // Line
  /**
   * 新增追蹤者
   * @param userId Line user ID
   */
  createOrUpdateFollowerAsync(userId: string): Promise<Line>

  /**
   * 刪除追蹤者
   * @param userId Line user ID
   */
  deleteFollowerAsync(userId: string): Promise<void>


  // Line event
  /**
   * 記錄 Line 事件
   */
  storeLineEvent(event: LineWebhookBaseEvent): Promise<LineEvent>


  // Line message
  /**
   * 記錄 Line 訊息
   * @param data 訊息傳遞物件
   */
  storeLineMessageAsync(data: LineMessageDto): Promise<LineMessage>

  /**
   * 取得訊息歷史記錄
   * @param userId Line user ID
   */
  getLineMessageAsync(userId: string): Promise<LineMessage[]>
}
