/**
 * 登入請求
 */
export class LoginRequest {
  public email: string
  public password: string
}

/**
 * 更改密碼請求
 */
export class UserChangePasswordRequest {
  public id: string
  public password: string
  public confirmPassword: string
}

/**
 * User 資料傳入
 */
export class UserRequest {
  public id?: string
  public email: string
  public password: string
  public confirmPassword: string
  public name: string
  public birthday?: string
}
