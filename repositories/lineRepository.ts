import * as db from '../sequelize/index.js'
import { LineMessage } from '../models/index.js'
import { Identifier } from 'sequelize'

/**
 * List user Line message
 * @param {string} userId 
 */
export async function listMessage(userId: any) {
  const list = await db.LineMessage.findAll({
    where: { userId },
    order: [
      ['createdAt', 'DESC']
    ],
    limit: 5
  })
  return list.map(item => new LineMessage(item))
}

/**
 * Create Line message
 * @param {Object} data
 * @param {string} data.userId
 * @param {string} data.message
 */
export async function createMessage(data: { userId: any; message: any }) {
  const test: any = {
    userId: data.userId,
    message: data.message
  }
  const item = await db.LineMessage.create(test)
  return new LineMessage(item)
}

/**
 * Read Line
 * @param {string} id
 */
export async function readMessage(id: Identifier | undefined) {
  const item = await db.LineMessage.findByPk(id)
  return item ? new LineMessage(item) : null
}

/**
 * Update Line
 * @param {string} id
 * @param {Object} data
 * @param {string | undefined} data.reply
 * @param {number | undefined} data.promptToken
 * @param {number | undefined} data.completionToken
 * @param {number | undefined} data.totalToken
 */
export function updateMessage(id: string, data: { reply: any; promptToken: any; completionToken: any; totalToken: any }) {
  return db.LineMessage.update({
    reply: data.reply,
    promptToken: data.promptToken,
    completionToken: data.completionToken,
    totalToken: data.totalToken
  }, {
    where: { id }
  })
}
