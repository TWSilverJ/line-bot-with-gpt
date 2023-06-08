import { BaseHttpController, controller, httpGet } from 'inversify-express-utils'

@controller('/api/auth')
export class AuthController extends BaseHttpController {
  @httpGet('/')
  public getCurrentLogin() {
    return 'No'
  }
}
