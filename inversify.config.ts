import { Container } from 'inversify'

import { config, TYPES } from './config/index.js'
import { ValidateLineSignature, TestMiddleware } from './middlewares/index.js'
import * as models from './sequelize/index.js'

// 進行 DI 注入
const container = new Container()
container.bind(TYPES.Config).toConstantValue(config)
container.bind(TYPES.Config).toConstantValue(models)

// Middleware
container.bind<TestMiddleware>(TYPES.TestMiddleware).to(TestMiddleware)
container.bind<ValidateLineSignature>(TYPES.ValidateLineSignature).to(ValidateLineSignature).inRequestScope()

export { container }
