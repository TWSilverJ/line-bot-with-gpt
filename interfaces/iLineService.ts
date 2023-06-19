import { Line } from '../models/index.js'

export interface ILineService {
  /**
   * 新增追蹤者
   * @param userId Line user ID
   */
  addFollowerAsync(userId: string): Promise<Line>

  /**
   * 刪除追蹤者
   * @param userId Line user ID
   */
  deleteFollowerAsync(userId: string): Promise<void>

  storeLineEvent(): any[]
}
