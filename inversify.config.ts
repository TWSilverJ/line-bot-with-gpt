import { Container } from 'inversify'

import { config } from './config/index.js'
import { ValidateLineSignature } from './middlewares/index.js'
import { TYPES } from './types.js'
import { TestMiddleware } from './middlewares/testMiddleware.js'

// 進行 DI 注入
const container = new Container()
container.bind(TYPES.Config).toConstantValue(config)

// Middleware
container.bind<TestMiddleware>(TYPES.TestMiddleware).to(TestMiddleware)
container.bind<ValidateLineSignature>(TYPES.ValidateLineSignature).to(ValidateLineSignature).inRequestScope()

export { container }
