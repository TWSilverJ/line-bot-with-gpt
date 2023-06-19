import axios, { AxiosInstance, AxiosResponse } from 'axios'

export class LineMessageApi {
  private readonly _client: AxiosInstance
  private readonly _dataClient: AxiosInstance

  constructor(accessToken: string) {
    this._client = axios.create({
      baseURL: 'https://api.line.me/v2',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`
      },
      withCredentials: true
    })

    this._dataClient = axios.create({
      baseURL: 'https://api.line.me/v2',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`
      },
      withCredentials: true
    })
  }


  // Webhook setting
  /**
   * 取得 Line channel endpoint
   */
  public getEndpointInfo(): Promise<AxiosResponse> {
    return this._client.get('/bot/channel/webhook/endpoint')
  }

  /**
   * 設定 Line channel endpoint
   * @param endpoint 
   */
  public setEndpointUrl(endpoint: string): Promise<AxiosResponse> {
    return this._client.put('/bot/channel/webhook/endpoint', { endpoint })
  }

  /**
   * 測試 Line channel endpoint
   * @param endpoint 
   */
  public testEndpoint(endpoint?: string): Promise<AxiosResponse> {
    return this._client.post('/bot/channel/webhook/test', { endpoint })
  }


  // Message
  /**
   * 回覆訊息
   * @param {Object} body 
   * @param {string} body.replyToken 
   * @param {any[]} body.messages 
   * @param {boolean} [body.notificationDisabled] 
   */
  public sendReplyMessage(body: { replyToken: string; messages: any[]; notificationDisabled?: boolean }): Promise<AxiosResponse> {
    return this._client.post('/bot/message/reply', body)
  }


  // Users
  /**
   * Get profile
   * @param {string} userId 
   */
  public getProfile(userId: string): Promise<AxiosResponse> {
    return this._client.get(`/bot/profile/${userId}`)
  }
}
