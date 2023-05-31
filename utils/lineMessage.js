import axios from 'axios'

import { lineMessageAPIConfig } from '../config/index.js'

const lineMessageAPI = axios.create({
  baseURL: 'https://api.line.me/v2',
  headers: {
    'Content-Type': 'application/json'
  },
  withCredentials: true
})

lineMessageAPI.interceptors.request.use(option => {
  option.headers.Authorization = `Bearer ${lineMessageAPIConfig.LINE_CHANNEL_ACCESS_TOKEN}`
  return option
})

/**
 * 回覆訊息
 * @param {Object} body 
 * @param {string} body.replyToken 
 * @param {any[]} body.messages 
 * @param {boolean} [body.notificationDisabled] 
 */
export function sendReplyMessage(body) {
  return lineMessageAPI.post('/bot/message/reply', body)
}
