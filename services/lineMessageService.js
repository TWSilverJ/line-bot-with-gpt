import { sendReplyMessage } from '../utils/index.js'

export function replyMessage(replyToken, message) {
  return sendReplyMessage({ replyToken, messages: [message] })
}
