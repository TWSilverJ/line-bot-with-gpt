/**
 * DI 注入的符號
 */
export const TYPES = {
  Config: Symbol.for('Config'),
  Test: Symbol.for('Test'),
  TestMiddleware: Symbol.for('TestMiddleware'),

  ValidateLineSignature: Symbol.for('ValidateLineSignature')
}
