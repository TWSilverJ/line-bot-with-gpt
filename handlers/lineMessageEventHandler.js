import { openAiAPIConfig } from '../config/index.js'
import { LineEvent } from '../models/index.js'
import { lineRepository } from '../repositories/index.js'
import { createChatCompletion, createTextCompletion, isChatCompletionModel, sendReplyMessage } from '../utils/index.js'

export async function handlerAsync(input) {
  // 只處理個人聊天訊息事件
  const event = new LineEvent(input)
  if (!event.isUser || !event.isMessage || !event.isText) { return }

  // 儲存訊息
  const lineMessage = await lineRepository.createMessage({
    userId: event.userId,
    message: event.text
  })

  // 取得歷史訊息
  const list = await lineRepository.listMessage(event.userId)
  let prompt = ''
  list.forEach(item => {
    const { message, reply } = item
    let text = `User: ${message}\nAgent:`
    if (reply) { text += ` ${reply}` }
    prompt = text + prompt
  })

  // 呼叫 GPT
  const isChat = isChatCompletionModel(openAiAPIConfig.OPENAI_COMPLETION_MODEL)
  let response = isChat
    ? await createChatCompletion({ messages: event.message.text })
    : await createTextCompletion({ prompt })

  // 儲存回覆
  const { choices, usage } = response.data
  const reply = choices[0].text.trim()
  await lineRepository.updateMessage(lineMessage.id, {
    reply,
    promptToken: usage.prompt_tokens,
    completionToken: usage.completion_tokens,
    totalToken: usage.total_tokens
  })

  // 製作文字回覆
  const lineTextMessage = { type: 'text', text: reply }

  // 回覆訊息
  response = await sendReplyMessage({
    replyToken: event.replyToken,
    messages: [lineTextMessage]
  })
}
