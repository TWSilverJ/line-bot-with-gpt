import { BaseEntityModel } from './baseModel.js'
import { bcryptCompare } from '../utils/cryptoHash.js'

/**
 * 使用者
 */
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
    return bcryptCompare(password, this._password)
  }
}

/** 
 * 使用者登入記錄
 */
export class UserLogin extends BaseEntityModel {
  /** 
   * User ID
   */
  public readonly idUser: string | null

  /** 
   * 登入時間
   */
  public loginTime: Date

  /** 
   * 登入類型
   */
  public loginType: string

  /** 
   * IP 位置
   */
  public ipAddress: string

  /** 
   * 使用者代理
   */
  public userAgent: string

  /** 
   * 成功標記
   */
  public succeeded: boolean

  /** 
   * 作廢標記
   */
  public revoked: boolean

  /** 
   * 有效期限
   */
  public expiresAt: Date | null

  constructor(id: string, idUser: string | null, createdAt: Date) {
    super(id, createdAt)
    this.idUser = idUser
    this.succeeded = false
    this.revoked = false
    this.expiresAt = null
  }

  /** 
   * 是否有效
   */
  public get isActive(): boolean {
    return !!this.idUser && this.succeeded && !this.revoked
  }
}
