import axios, { AxiosInstance, AxiosResponse } from 'axios'

export class OpenAiApi {
  private readonly _client: AxiosInstance

  constructor(accessToken: string) {
    this._client = axios.create({
      baseURL: 'https://api.openai.com/',
      headers: {
        'Accept-Encoding': 'gzip, deflate, compress',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`
      },
      withCredentials: true
    })
  }

  /**
   * 是否為對話模型
   * @param model 模型名稱
   */
  public isChatCompletionModel(model: string): boolean {
    if (typeof model !== 'string') { model = String(model) }
    return model.startsWith('gpt-4') || model.startsWith('gpt-3.5')
  }

  /**
   * Create chat completion
   * @param body Chat completion request body
   * @returns 
   */
  public createChatCompletion = (
    body: OpenAiCreateChatCompletionRequest
  ): Promise<AxiosResponse<OpenAiCreateChatCompletionResponse, any>> =>
    this._client.post('v1/chat/completions', body)

  /**
   * Create text completion
   * @param body Text completion request body
   * @returns 
   */
  public createTextCompletion = (
    body: OpenAiCreateTextCompletion
  ): Promise<AxiosResponse<OpenAiCreateChatCompletionResponse, any>> =>
    this._client.post('v1/completions', body)
}

export class OpenAiCreateChatCompletionRequest {
  /**
   * 呼叫模型名稱
   */
  public model: string

  /**
   * 呼叫內容清單
   */
  public messages: OpenAiChatMessage[]

  /**
   * 對話溫度
   * @description 建議溫度與質量擇一，而非兩者都給予
   */
  public temperature?: number

  /**
   * 對話質量
   * @description 建議溫度與質量擇一，而非兩者都給予
   */
  public top_p?: number

  /**
   * 結尾註記
   */
  public stop?: string[]

  /**
   * 最大回復令牌數
   */
  public max_tokens: number
  public presence_penalty: number
  public frequency_penalty: number
}

export class OpenAiChatMessage {
  public role: 'system' | 'user' | 'assistant'
  public name?: string
  public content?: string
}

class OpenAiCreateChatCompletionResponse {
  public id: string
  public object: string
  public created: number
  public model?: string
  public choices: any[]
  // public choices: OpenAiCompletionChoices[]
  public usage: OpenAiTokenUsage
}

class OpenAiCompletionChoices {
  public text: string
  public index: number
  public logprobs: number | null
  public finish_reason: string
}

class OpenAiTokenUsage {
  public prompt_tokens: number
  public completion_tokens: number
  public total_tokens: number
}

export class OpenAiCreateTextCompletion {
  /**
   * 目標模型
   */
  public model: string

  /**
   * 提示
   */
  public prompt: string

  /**
   * 結束標記
   */
  public stop?: string[]

  /**
   * 最大 token 數量
   */
  public max_tokens?: number

  /**
   * 對話溫度
   * @description 建議溫度與質量擇一，而非兩者都給予
   */
  public temperature?: number

  /**
   * 對話質量
   * @description 建議溫度與質量擇一，而非兩者都給予
   */
  public top_p?: number

  public presence_penalty: number
  public frequency_penalty: number
}
