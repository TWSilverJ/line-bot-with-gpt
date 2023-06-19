/**
 * DI 注入的符號
 */
export const TYPES = {
  Config: Symbol.for('Config'),
  Model: Symbol.for('Model'),

  LineRepository:Symbol.for('LineRepository'),
  UserRepository:Symbol.for('UserRepository'),

  UserService:Symbol.for('UserService'),

  Test: Symbol.for('Test'),
  TestMiddleware: Symbol.for('TestMiddleware'),

  ValidateLineSignature: Symbol.for('ValidateLineSignature')
}
