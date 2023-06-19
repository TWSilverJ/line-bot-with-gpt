import dotenv from 'dotenv'

// 讀取 .env
dotenv.config()
const { cwd, env } = process

/**
 * Normalize a port into a number, string, or false.
 * @param val
 */
export function normalizePort(val: string) {
  const port = parseInt(val, 10)

  // named pipe
  if (isNaN(port)) { return val }

  // port number
  if (port >= 0) { return port }

  return false
}

export const config = {
  APP_ENV: env.NODE_ENV || 'production',
  APP_DEBUG: String(env.APP_DEBUG).toLocaleLowerCase() === 'true' || false,
  APP_PORT: normalizePort(env.PORT || '3000'),
  APP_URL: env.APP_URL || null,
  JWT_TOKEN: env.JWT_TOKEN || '',
  LINE_BASE_URL: env.LINE_BASE_URL || 'https://api.line.me/v2',
  LINE_CHANNEL_ACCESS_TOKEN: env.LINE_MESSAGE_CHANNEL_ACCESS_TOKEN || '',
  LINE_CHANNEL_SECRET: env.LINE_MESSAGE_CHANNEL_SECRET || '',
  OPENAI_API_KEY: env.OPENAI_API_KEY || null,
  OPENAI_BASE_URL: env.OPENAI_BASE_URL || 'https://api.openai.com',
  OPENAI_COMPLETION_MODEL: env.OPENAI_COMPLETION_MODEL || 'gpt-3.5-turbo',
  OPENAI_COMPLETION_TEMPERATURE: Number(env.OPENAI_COMPLETION_TEMPERATURE) || 0.9,
  OPENAI_COMPLETION_MAX_TOKENS: Number(env.OPENAI_COMPLETION_MAX_TOKENS) || 160,
  OPENAI_COMPLETION_TOP_P: Number(env.OPENAI_COMPLETION_TOP_P) || 1,
  OPENAI_COMPLETION_FREQUENCY_PENALTY: Number(env.OPENAI_COMPLETION_FREQUENCY_PENALTY) || 0,
  OPENAI_COMPLETION_PRESENCE_PENALTY: Number(env.OPENAI_COMPLETION_PRESENCE_PENALTY) || 0.6,
  OPENAI_CHAT_SYSTEM_ROLE: env.OPENAI_CHAT_SYSTEM_ROLE || '',
  OPENAI_IMAGE_GENERATION_SIZE: env.OPENAI_IMAGE_GENERATION_SIZE || '256x256',
}

export const database: any = {
  dialect: env.DB_DIALECT || 'sqlite',
  storage: `${cwd()}/private/db.sqlite3`
}

export * from './types.js'
