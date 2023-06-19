import { inject, injectable } from 'inversify'

import { TYPES } from '../config/index.js'
import { IUserRepository } from '../interfaces/index.js'
import { User, UserDto, UserLogin, UserLoginDto } from '../models/index.js'
import * as sequelizeModels from '../sequelize/index.js'

@injectable()
export class UserRepository implements IUserRepository {
  @inject(TYPES.Model)
  private readonly _models: typeof sequelizeModels

  // User
  /**
   * 實例化 User 物件
   * @param data 從資料庫中取得的資料
   * @returns 實例化物件
  */
  private createUserEntity(data: sequelizeModels.User): User {
    const user = new User(data.id, data.createdAt)
    user.email = data.email
    user.password = data.password
    user.birthday = data.birthday
    return user
  }

  public async getUserListAsync(): Promise<User[]> {
    // 資料庫查詢
    const list = await this._models.User.findAll()

    // 整理並回傳
    return list.map(item => this.createUserEntity(item))
  }

  public async createUser(data: UserDto): Promise<User> {
    // 資料庫操作
    const item = await this._models.User.create(data as any)

    // 整理並回傳
    return this.createUserEntity(item)
  }

  public async readUser(id?: string, email?: string): Promise<User | null> {
    let item = null

    // 資料庫查詢
    if (id) {
      item = await this._models.User.findByPk(id)
    } else if (email) {
      item = await this._models.User.findOne({ where: { email } })
    }

    // 整理並回傳
    return item ? this.createUserEntity(item) : null
  }

  public async updateUser(id: string, data: UserDto): Promise<number> {
    // 資料庫操作
    const result = await this._models.User.update(data as any, {
      fields: [
        'email',
        'password',
        'name',
        'birthday',
        'revoked',
        'deletedAt'
      ],
      where: { id }
    })

    // 整理並回傳
    return result[0]
  }

  public deleteUser(id: string, force?: boolean | undefined): Promise<number> {
    return this._models.User.destroy({ where: { id }, force })
  }


  // UserLogin
  /**
   * 實例化 UserLogin 物件
   * @param data 從資料庫中取得的資料
   * @returns 實例化物件
  */
  private createUserLoginEntity(data: sequelizeModels.UserLogin): UserLogin {
    const userLogin = new UserLogin(data.id, data.idUser, data.createdAt)
    userLogin.loginTime = data.loginTime
    userLogin.loginType = data.loginType
    userLogin.ipAddress = data.ipAddress
    userLogin.userAgent = data.userAgent
    userLogin.succeeded = data.succeeded
    userLogin.revoked = data.revoked
    userLogin.expiresAt = data.expiresAt
    return userLogin
  }

  public countUserLogin(idUser: string): Promise<number> {
    return this._models.UserLogin.count({ where: { id: idUser } })
  }

  public async listUserLogin(idUser: string): Promise<UserLogin[]> {
    // 資料庫查詢
    const list = await this._models.UserLogin.findAll({
      where: { idUser },
      order: [
        ['loginTime', 'DESC']
      ]
    })

    // 整理並回傳
    return list.map(item => this.createUserLoginEntity(item))
  }

  public async createUserLogin(data: UserLoginDto): Promise<UserLogin> {
    // 資料庫操作
    const item = await this._models.UserLogin.create(data as any)

    // 整理並回傳
    return this.createUserLoginEntity(item)
  }

  public async updateUserLogin(id: string, data: UserLoginDto): Promise<number> {
    // 資料庫操作
    const result = await this._models.UserLogin.update(data as any, {
      fields: [
        'revoked',
        'expiresAt',
        'deletedAt'
      ], where: { id }
    })

    // 整理並回傳
    return result[0]
  }
}
