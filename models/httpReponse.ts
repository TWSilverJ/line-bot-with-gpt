import { HttpStatusCode, IHttpResponse } from '../interfaces/httpResponse.js'

/**
 * HTTP response
 */
export class HttpResponse<T> implements IHttpResponse<T> {
  public code: HttpStatusCode
  public message: string
  public data?: T

  constructor(message: string, data?: T, code: HttpStatusCode = 200) {
    this.message = message
    if (data) { this.data = data }
    this.code = code ?? 200
  }
}
