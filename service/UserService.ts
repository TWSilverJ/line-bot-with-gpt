import { bcryptHash } from '../utils/cryptoHash.js'
import { inject, injectable } from 'inversify'
import jwt from 'jsonwebtoken'

import { config } from '../config/index.js'
import { IUserRepository, IUserService } from '../interfaces/index.js'
import { User, UserAccountDto, UserDto, UserLogin, UserLoginDto } from '../models/index.js'
import { TYPES } from '../types.js'

@injectable()
export class UserService implements IUserService {
  private _config: typeof config
  private _userRepository: IUserRepository

  constructor(
    @inject(TYPES.Config) appConfig: typeof config,
    @inject(TYPES.UserRepository) userRepository: IUserRepository
  ) {
    this._config = config
    this._userRepository = userRepository
  }

  // User
  public async createUser(data: UserDto): Promise<User | null> {
    // 檢查重複註冊
    if (!data.email) { return null }
    const exist = await this._userRepository.readUser(undefined, data.email)
    if (exist) { return null }

    // 雜湊密碼
    if (!data.password) { return null }
    data.password = await bcryptHash(data.password)

    // 建立使用者
    const user = await this._userRepository.createUser(data)
    return user
  }

  public async readUser(id: string): Promise<User | null> {
    const user = await this._userRepository.readUser(id)
    return user
  }


  // UserLogin
  /**
   * 簽發 JWT token
   * @param login 
   * @returns 
   */
  private signJwtToken(login: UserLogin): string {
    return jwt.sign({
      id: login.id,
      idUser: login.idUser,
      role: 'user',
      exp: login.expiresAt?.getTime()
    }, this._config.JWT_TOKEN)
  }

  public async login(account: UserAccountDto, loginData: UserLoginDto): Promise<string | null> {
    // 取得使用者
    const user = await this._userRepository.readUser(undefined, account.email)

    // 比較密碼雜湊
    if (!user) {
      loginData.idUser = null
    } else {
      loginData.idUser = user.id
      loginData.succeeded = await user.comparePassword(account.password)
    }

    // 登入作業
    loginData.loginType = 'password'
    const login = await this._userRepository.createUserLogin(loginData)
    return login.isActive ? this.signJwtToken(login) : null
  }

  public async logout(id: string, idUser: string): Promise<void> {
    // 建立資料傳遞物件
    const data = new UserLoginDto()
    data.revoked = true

    if (id) {
      // 作廢一筆登入記錄
      await this._userRepository.updateUserLogin(id, data)
    } else if (idUser) {
      // 批次作廢使用者所有登入記錄
      const list = await this._userRepository.listUserLogin(idUser)
      const promiseList = list.map(item => this._userRepository.updateUserLogin(item.id, data))
      await Promise.all(promiseList)
    }
  }
}
