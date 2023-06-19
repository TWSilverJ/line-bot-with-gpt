import { User, UserDto, UserLogin, UserLoginDto } from '../models/index.js'

export interface IUserRepository {
  // User
  /**
   * 建立使用者
   * @param data 使用者資料
  */
  createUser(data: UserDto): Promise<User>

  /**
   * 取得使用者清單
   */
  getUserListAsync(): Promise<User[]>

  /**
   * 取得使用者
   * @param id 使用者 UUID
   * @param email 使用者帳號
   */
  readUser(id?: string, email?: string): Promise<User | null>

  /**
   * 更新使用者
   * @param id 使用者 UUID
   * @param data 使用者資料
   */
  updateUser(id: string, data: UserDto): Promise<number>

  /**
   * 刪除使用者
   * @param id 使用者 UUID
   * @param force 是否強制刪除
   */
  deleteUser(id: string, force?: boolean): Promise<number>


  // UserLogin
  /**
   * 計算使用者登入次數
   * @param id 使用者 UUID
   */
  countUserLogin(idUser: string): Promise<number>

  /**
   * 列出使用者登入記錄清單
   * @param id 使用者 UUID
   */
  listUserLogin(idUser: string): Promise<UserLogin[]>

  /**
   * 建立使用者登入記錄
   * @param data 使用者登入資料
   */
  createUserLogin(data: UserLoginDto): Promise<UserLogin>

  /**
   * 更新使用者登入記錄
   * @param id 登入記錄 UUID
   * @param data 登入資料
   */
  updateUserLogin(id: string, data: UserLoginDto): Promise<number>
}
