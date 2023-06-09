import { User, UserDto } from '../models/index.js'

export interface IUserRepository {
  /**
   * 列出使用者清單
   */
  listUser(): Promise<User[]>

  /**
   * 建立使用者
   * @param data 資料傳遞物件
   */
  createUser(data: UserDto): Promise<User>

  /**
   * 取得使用者資料
   * @param id 使用者 UUID
   * @param email 使用者帳號
   */
  readUser(id?: string, email?: string): Promise<User | null>

  /**
   * 更新使用者資料
   * @param id 使用者 UUID
   * @param data 資料傳遞物件
   */
  updateUser(id: string, data: UserDto): Promise<number>

  /**
   * 刪除使用者
   * @param id 使用者 UUID
   * @param force 是否強制刪除
   */
  deleteUser(id: string, force?: boolean): Promise<number>
}
