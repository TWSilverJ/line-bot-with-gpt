import { User, UserAccountDto, UserDto, UserLoginDto } from '../models/index.js'

export interface IUserService {
  // User
  /**
   * 建立使用者
   * @param data 使用者資料
   */
  createUser(data: UserDto): Promise<User | null>

  /**
   * 取得使用者資料
   * @param id 使用者 UUID
   */
  readUser(id: string): Promise<User | null>


  // UserLogin
  /**
   * 登入
   * @param account 帳號密碼
   */
  login(account: UserAccountDto, login: UserLoginDto): Promise<string | null>

  /**
   * 登出
   * @param id 登入記錄 UUID
   * @param idUser 使用者 UUID
   */
  logout(id?: string, idUser?: string): Promise<void>
}
