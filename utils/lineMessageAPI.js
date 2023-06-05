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


// Webhook setting
/**
 * 取得 Line channel endpoint
 * @returns 
 */
export function getEndpointInfo() {
  return lineMessageAPI.get('/bot/channel/webhook/endpoint')
}

/**
 * 設定 Line channel endpoint
 * @param {string} endpoint 
 */
export function setEndpointUrl(endpoint) {
  return lineMessageAPI.put('/bot/channel/webhook/endpoint', { endpoint })
}

/**
 * 測試 Line channel endpoint
 * @param {string | undefined} endpoint 
 */
export function testEndpoint(endpoint) {
  return lineMessageAPI.post('/bot/channel/webhook/test', { endpoint })
}


// Message
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


// Users
/**
 * Get profile
 * @param {string} userId 
 */
export function getProfile(userId) {
  return lineMessageAPI.get(`/bot/profile/${userId}`)
}
