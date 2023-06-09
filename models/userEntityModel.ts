import { BaseEntityModel } from './baseModel.js'
import { compare } from '../utils/cryptoHash.js'

export class User extends BaseEntityModel {
  public email: string
  private _password: string
  public name: string
  public birthday: Date | null
  public revoked: boolean

  /**
   * 設置密碼
   */
  public set password(password: string) {
    this._password = password
  }

  /** 
   * 是否為有效帳戶
   */
  public get isActive(): boolean {
    return !this.revoked
  }

  /** 
   * 核對密碼雜湊
   */
  public comparePassword(password: string): Promise<boolean> {
    return compare(password, this._password)
  }
}
