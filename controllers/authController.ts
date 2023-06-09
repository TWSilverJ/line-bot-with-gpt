import { BaseHttpController, controller, httpGet, httpPost, requestBody } from 'inversify-express-utils'

import { BadRequestError, LoginRequest } from '../models/index.js'

@controller('/api/auth')
export class AuthController extends BaseHttpController {
  @httpGet('/')
  public getCurrentLogin() {
    return 'No'
  }

  /**
   * 取得當前登入的使用者
   */
  @httpGet('/user')
  public getCurrentUser() {
    return 'No'
  }

  @httpPost('/user')
  public userLogin(
    @requestBody() body: LoginRequest
  ) {
    // 檢查輸入
    const errors: string[][] = []
    if (!body.email) { errors.push(['email', 'require']) }
    if (!body.password) { errors.push(['password', 'require']) }
    if (errors.length) { throw new BadRequestError('請檢查輸入', errors) }

    console.log(body)
    return 'no'
  }
}
