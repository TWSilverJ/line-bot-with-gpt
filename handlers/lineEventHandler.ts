import { inject, injectable } from 'inversify'

import { TYPES, config } from '../config/index.js'
import { ILineService, IWebhookEventHandler } from '../interfaces/index.js'
import { LineWebhookBaseEvent, LineFollowEvent, LineUnfollowEvent, LineMessageEvent, LineMessageDto, OpenAiApi, OpenAiCreateChatCompletionRequest, OpenAiCreateTextCompletion, OpenAiChatMessage } from '../models/index.js'
import { sendReplyMessage } from '../utils/index.js'

@injectable()
export class LineEventHandler implements IWebhookEventHandler {
  @inject(TYPES.Config)
  private readonly _config: typeof config

  @inject(TYPES.LineService)
  private readonly _lineService: ILineService

  @inject(TYPES.LineMessageEventHandlerFactory)
  private readonly _lineMessageEventHandlerFactory: () => IWebhookEventHandler

  public async handler(event: LineWebhookBaseEvent): Promise<void> {
    // 記錄事件
    await this._lineService.storeLineEvent(event)

    // 處理事件
    switch (event.type) {
      case 'follow':
        await this.followEvent(event as LineFollowEvent)
        break

      case 'unfollow':
        await this.unfollowEvent(event as LineUnfollowEvent)
        break

      case 'message':
        await this.messageEvent(event as LineMessageEvent)
        break

      default:
        console.warn(`未定義事件種類： ${event.type}`)
    }
  }

  /**
   * 追蹤事件
   * @param event 追蹤事件
   */
  private async followEvent(event: LineFollowEvent): Promise<void> {
    await this._lineService.createOrUpdateFollowerAsync(event.source!.userId!)
  }

  /**
   * 取消追蹤事件
   * @param event 取消追蹤事件
   */
  private async unfollowEvent(event: LineUnfollowEvent): Promise<void> {
    await this._lineService.deleteFollowerAsync(event.source!.userId!)
  }

  /**
   * 訊息事件
   * @param event 訊息事件
   */
  private async messageEvent(event: LineMessageEvent): Promise<void> {
    // 只處理個人聊天訊息事件
    if (event.source.type !== 'user') { return }
    await this._lineService.createOrUpdateFollowerAsync(event.source.userId!)


    // 取得歷史訊息
    const list = await this._lineService.getLineMessageAsync(event.source.userId!)
    const messages = []
    list.forEach(item => {
      const assistantMessage = new OpenAiChatMessage()
      assistantMessage.role = 'assistant'
      assistantMessage.content = item.reply ?? ''
      messages.unshift(assistantMessage)

      const userMessage = new OpenAiChatMessage()
      userMessage.role = 'user'
      userMessage.content = item.message ?? ''
      messages.unshift(userMessage)
    })

    // 給予暗示
    const systemMessage = new OpenAiChatMessage()
    systemMessage.role = 'system'
    systemMessage.content = this._config.OPENAI_CHAT_SYSTEM_ROLE
    messages.push(systemMessage)

    // 給予訊息
    const userMessage = new OpenAiChatMessage()
    userMessage.role = 'user'
    userMessage.content = event.message.text
    messages.push(userMessage)

    // 呼叫 GPT
    const openAiAPI = new OpenAiApi(this._config.OPENAI_API_KEY)
    const isChat = openAiAPI.isChatCompletionModel(this._config.OPENAI_COMPLETION_MODEL)
    let response = null
    if (isChat) {
      const body = new OpenAiCreateChatCompletionRequest()
      body.model = this._config.OPENAI_COMPLETION_MODEL
      body.messages = messages
      body.top_p = this._config.OPENAI_COMPLETION_TOP_P
      response = await openAiAPI.createChatCompletion(body)
    } else {
      const body = new OpenAiCreateTextCompletion()
      response = await openAiAPI.createTextCompletion(body)
    }

    // 儲存訊息與回覆
    const { choices, usage } = response.data
    // const reply = choices[0].text.trim()
    const reply = choices[0].message.content
    const lineMessageDto = new LineMessageDto()
    lineMessageDto.userId = event.source.userId
    lineMessageDto.message = event.message.text
    lineMessageDto.reply = reply
    lineMessageDto.promptToken = usage.prompt_tokens
    lineMessageDto.completionToken = usage.completion_tokens
    lineMessageDto.totalToken = usage.total_tokens
    await this._lineService.storeLineMessageAsync(lineMessageDto)

    // 製作文字回覆
    const lineTextMessage = { type: 'text', text: reply }

    // 回覆訊息
    response = await sendReplyMessage({
      replyToken: event.replyToken,
      messages: [lineTextMessage]
    })
  }
}
