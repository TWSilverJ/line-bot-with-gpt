import { BaseHttpController, controller, httpGet, requestParam } from 'inversify-express-utils'

import { TYPES } from '../config/index.js'
import { BadRequestError, ForbiddenError, InternalServerError, NotFoundError, TeapotError, UnauthorizedError } from '../models/httpErrorModel.js'

@controller('/api')
export class HomeController extends BaseHttpController {
  @httpGet('/test')
  public index() {
    return 'Hi'
  }

  @httpGet('/test/middleware', TYPES.TestMiddleware)
  public testMiddleware() {
    return 'Hi'
  }

  @httpGet('/error')
  @httpGet('/error/:code')
  public testError(
    @requestParam('code') code: string
  ) {
    switch (code) {
      case '400':
        throw new BadRequestError('Bad Request')
      case '401':
        throw new UnauthorizedError('Unauthorized')
      case '403':
        throw new ForbiddenError('Forbidden')
      case '404':
        throw new NotFoundError('Not Found')
      case '418':
        throw new TeapotError('I\'m a teapot')
      case '500':
        throw new InternalServerError('Internal Server Error')
      default:
        throw new Error('Unknown Error')
    }
  }
}
