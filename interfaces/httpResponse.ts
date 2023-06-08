/**
 * HTTP 狀態碼
 */
export type HttpStatusCode = 200 | 201 | 202 | 400 | 401 | 403 | 404 | 418 | 500

/**
 * HTTP response
 */
export interface IHttpResponse<T> {
  /**
   * HTTP 狀態碼
   */
  code: HttpStatusCode

  /**
   * 訊息
   */
  message: string

  /**
   * 內容
   */
  data?: T
}

/**
 * HTTP error
 */
export interface IHttpError<T> {
  /**
   * HTTP 狀態碼
   */
  code: HttpStatusCode

  /**
   * 訊息
   */
  message: string

  /**
   * 內容
   */
  error?: T
}
