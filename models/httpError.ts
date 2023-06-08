import { HttpStatusCode, IHttpError } from '../interfaces/httpResponse.js'

/**
 * HTTP error
 */
export abstract class HttpError<T> extends Error implements IHttpError<T> {
  public code: HttpStatusCode
  public error?: T

  constructor(
    code: HttpStatusCode,
    name: string,
    message: string,
    error?: T
  ) {
    super(message)
    this.code = code
    this.name = name
    this.message = message
    if (error) { this.error = error }
  }
}


// 400 系列
/**
 * 400 - 無效的請求
 */
export class BadRequestError<T> extends HttpError<T> {
  constructor(message: string, error?: T) {
    super(400, 'Bad Request', message, error)
  }
}

/**
 * 401 - 未經授權
 */
export class UnauthorizedError<T> extends HttpError<T> {
  constructor(message: string, error?: T) {
    super(401, 'Unauthorized', message, error)
  }
}

/**
 * 403 - 禁止訪問
 */
export class ForbiddenError<T> extends HttpError<T> {
  constructor(message: string, error?: T) {
    super(403, 'Forbidden', message, error)
  }
}

/**
 * 404 - 找不到
 */
export class NotFoundError<T> extends HttpError<T> {
  constructor(message: string, error?: T) {
    super(404, 'Not Found', message, error)
  }
}

/**
 * 418 - 我是一個茶壺
 */
export class TeapotError<T> extends HttpError<T> {
  constructor(message: string, error?: T) {
    super(418, 'I\'m a teapot', message, error)
  }
}


// 500 系列
/**
 * 500
 */
export class InternalServerError<T> extends HttpError<T> {
  constructor(message: string, error?: T) {
    super(500, 'Internal Server Error', message, error)
  }
}
