import { createHmac, timingSafeEqual } from 'node:crypto'

/**
 * 比對數位簽章
 * @param {any} body
 * @param {string} secret
 * @param {string} signature
 */
export function validateSignature(body, secret, signature) {
  body = JSON.stringify(body)
  const a = createHmac('SHA256', secret).update(body).digest()
  const b = Buffer.from(signature, 'base64')
  return a.length === b.length && timingSafeEqual(a, b)
}
