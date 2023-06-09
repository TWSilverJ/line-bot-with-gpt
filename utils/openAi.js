import axios from 'axios'

import { config } from '../config/index.js'

const client = axios.create({
  baseURL: 'https://api.openai.com',
  headers: {
    'Accept-Encoding': 'gzip, deflate, compress',
  },
})

client.interceptors.request.use(option => {
  option.headers.Authorization = `Bearer ${config.OPENAI_API_KEY}`
  return option
})

/**
 * @param {string} model
 */
export function isChatCompletionModel(model) {
  if (typeof model !== 'string') { model = String(model) }
  return model.startsWith('gpt-4') || model.startsWith('gpt-3.5')
}

export const createChatCompletion = ({
  model = config.OPENAI_COMPLETION_MODEL,
  messages,
  temperature = config.OPENAI_COMPLETION_TEMPERATURE,
  maxTokens = config.OPENAI_COMPLETION_MAX_TOKENS,
  frequencyPenalty = config.OPENAI_COMPLETION_FREQUENCY_PENALTY,
  presencePenalty = config.OPENAI_COMPLETION_PRESENCE_PENALTY,
}) => client.post('/v1/chat/completions', {
  model,
  messages,
  temperature,
  max_tokens: maxTokens,
  frequency_penalty: frequencyPenalty,
  presence_penalty: presencePenalty,
})

export const createTextCompletion = ({
  model = config.OPENAI_COMPLETION_MODEL,
  prompt,
  temperature = config.OPENAI_COMPLETION_TEMPERATURE,
  maxTokens = config.OPENAI_COMPLETION_MAX_TOKENS,
  frequencyPenalty = config.OPENAI_COMPLETION_FREQUENCY_PENALTY,
  presencePenalty = config.OPENAI_COMPLETION_PRESENCE_PENALTY,
  stop = ['<END>'],
}) => client.post('/v1/completions', {
  model,
  prompt,
  temperature,
  max_tokens: maxTokens,
  frequency_penalty: frequencyPenalty,
  presence_penalty: presencePenalty,
  stop,
})
