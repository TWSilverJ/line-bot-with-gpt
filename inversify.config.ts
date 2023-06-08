import { Container } from 'inversify'

import './controllers/index.js'
import { ValidateLineSignature } from './middlewares/index.js'
import { TYPES } from './types.js'

// 進行 DI 注入
const container = new Container()

// Middleware
container.bind<ValidateLineSignature>(TYPES.ValidateLineSignature).to(ValidateLineSignature).inRequestScope()

export { container }
