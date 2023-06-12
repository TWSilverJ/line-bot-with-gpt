export class OpenAiCreateChatCompletion {
  public model: string
  public messages: any[]
  public maxToken: number
  public template: number
  public topP: number
  public frequencyPenalty: number
  public presencePenalty: number
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
  public stop: string[]

  /**
   * 最大 token 數量
   */
  public maxToken: number

  /**
   * 對話溫度
   */
  public template: number

  /**
   * 囉嗦程度
   */
  public topP: number

  public frequencyPenalty: number
  public presencePenalty: number
}
