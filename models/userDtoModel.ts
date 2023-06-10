import { BaseDtoModel } from './baseModel.js'

export class UserDto extends BaseDtoModel {
  public email?: string
  public password?: string
  public name?: string
  public birthday?: string | null
}

export class UserAccountDto {
  public email: string
  public password: string
}

export class UserLoginDto {
  public idUser?: string | null
  public loginTime?: Date
  public loginType?: string
  public ipAddress?: string
  public userAgent?: string
  public succeeded?: boolean
  public revoked?: boolean
  public expiresAt?: Date | null
} 
