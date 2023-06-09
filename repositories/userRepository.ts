import { inject, injectable } from 'inversify'

import { IUserRepository } from '../interfaces/index.js'
import { User, UserDto } from '../models/index.js'
import * as sequelizeModels from '../sequelize/index.js'
import { TYPES } from '../types.js'

@injectable()
export class UserRepository implements IUserRepository {
  private readonly _models: typeof sequelizeModels

  constructor(
    @inject(TYPES.Model) models: typeof sequelizeModels
  ) {
    this._models = models
  }

  /**
   * 實例化 User 物件
   * @param data 從資料庫中取得的 User 資料
   * @returns User 實例化物件
   */
  private createUserEntity(data: sequelizeModels.User): User {
    const user = new User(data.id, data.createdAt)
    user.email = data.email
    user.password = data.password
    user.birthday = data.birthday
    return user
  }

  public async listUser(): Promise<User[]> {
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
    const result = await this._models.User.update(data as any, { where: { id } })

    // 整理並回傳
    return result[0]
  }

  public deleteUser(id: string, force?: boolean | undefined): Promise<number> {
    return this._models.User.destroy({ where: { id }, force })
  }
}
