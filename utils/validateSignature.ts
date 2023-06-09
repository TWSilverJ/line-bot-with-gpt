import { BinaryLike, createHmac, KeyObject, timingSafeEqual } from 'node:crypto'

/**
 * 比對數位簽章
 */
export function validateSignature(body: BinaryLike, secret: BinaryLike | KeyObject, signature: string) {
  body = JSON.stringify(body)
  const a = createHmac('SHA256', secret).update(body).digest()
  const b = Buffer.from(signature, 'base64')
  return a.length === b.length && timingSafeEqual(a, b)
}
