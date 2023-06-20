import { Container, interfaces } from 'inversify'

import { TYPES, config } from './config/index.js'
import { LineEventHandler, LineMessageEventHandler } from './handlers/index.js'
import { ILineRepository, ILineService, IWebhookEventHandler } from './interfaces/index.js'
import { ValidateLineSignature } from './middlewares/index.js'
import * as models from './sequelize/index.js'
import { LineService } from './service/index.js'
import { LineRepository } from './repositories/index.js'

// 進行 DI 注入
const container = new Container()
container.bind(TYPES.Config).toConstantValue(config)
container.bind(TYPES.Model).toConstantValue(models)

// Repository
container.bind<ILineRepository>(TYPES.LineRepository).to(LineRepository).inRequestScope()

// Service
container.bind<ILineService>(TYPES.LineService).to(LineService).inRequestScope()

// Handler factory
container.bind<IWebhookEventHandler>(TYPES.LineEventHandler).to(LineEventHandler).inSingletonScope()
container.bind<interfaces.Factory<IWebhookEventHandler>>(TYPES.LineEventHandlerFactory)
  .toFactory<LineEventHandler>((context: interfaces.Context) =>
    () => context.container.get<LineEventHandler>(TYPES.LineEventHandler))

container.bind<IWebhookEventHandler>(TYPES.LineMessageEventHandler).to(LineMessageEventHandler).inSingletonScope()
container.bind<interfaces.Factory<IWebhookEventHandler>>(TYPES.LineMessageEventHandlerFactory)
  .toFactory<LineMessageEventHandler>((context: interfaces.Context) =>
    () => context.container.get<LineMessageEventHandler>(TYPES.LineMessageEventHandler))

// Middleware
container.bind<ValidateLineSignature>(TYPES.ValidateLineSignatureMiddleware).to(ValidateLineSignature).inRequestScope()

export { container }
