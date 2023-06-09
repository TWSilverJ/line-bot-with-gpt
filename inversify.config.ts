import { Container } from 'inversify'

import { config } from './config/index.js'
import { ValidateLineSignature, TestMiddleware } from './middlewares/index.js'
import * as models from './sequelize/index.js'
import { TYPES } from './types.js'

// 進行 DI 注入
const container = new Container()
container.bind(TYPES.Config).toConstantValue(config)
container.bind(TYPES.Config).toConstantValue(models)

// Middleware
container.bind<TestMiddleware>(TYPES.TestMiddleware).to(TestMiddleware)
container.bind<ValidateLineSignature>(TYPES.ValidateLineSignature).to(ValidateLineSignature).inRequestScope()

export { container }
