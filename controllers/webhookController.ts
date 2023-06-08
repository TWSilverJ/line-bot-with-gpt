import { BaseHttpController, controller, httpPost } from 'inversify-express-utils'

import { TYPES } from '../types.js'

@controller('/webhook')
export class WebhookController extends BaseHttpController {
  @httpPost('/line', TYPES.ValidateLineSignature)
  public lineWebhook() {
    return this.ok()
  }
}
