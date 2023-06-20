/**
 * DI 注入的符號
 */
export const TYPES = {
  Config: Symbol.for('Config'),
  Model: Symbol.for('Model'),

  LineRepository: Symbol.for('LineRepository'),
  UserRepository: Symbol.for('UserRepository'),

  LineService: Symbol.for('LineService'),
  UserService: Symbol.for('UserService'),

  LineEventHandler: Symbol.for('LineEventHandler'),
  LineEventHandlerFactory: Symbol.for('LineEventHandlerFactory'),
  LineMessageEventHandler: Symbol.for('LineMessageEventHandler'),
  LineMessageEventHandlerFactory: Symbol.for('LineMessageEventHandlerFactory'),

  ValidateLineSignatureMiddleware: Symbol.for('ValidateLineSignatureMiddleware')
}
