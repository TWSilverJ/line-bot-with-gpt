import axios, { AxiosInstance } from 'axios'
import { injectable } from 'inversify'

import { config } from '../config/index.js'

@injectable()
export class OpenAiWebAPI {
  private _client: AxiosInstance

  constructor(accessToken: string) {
    this._client = axios.create({
      baseURL: 'https://api.openai.com',
      headers: {
        'Accept-Encoding': 'gzip, deflate, compress',
        Authorization: `Bearer ${accessToken}`
      }
    })
  }

  /**
   * @param {string} model
   */
  public isChatCompletionModel(model: string) {
    if (typeof model !== 'string') { model = String(model) }
    return model.startsWith('gpt-4') || model.startsWith('gpt-3.5')
  }

  /**
   * Create chat completion
   * @param {any} param0 
   * @returns 
   */
  public createChatCompletion = ({
    model = config.OPENAI_COMPLETION_MODEL,
    messages,
    temperature = config.OPENAI_COMPLETION_TEMPERATURE,
    maxTokens = config.OPENAI_COMPLETION_MAX_TOKENS,
    frequencyPenalty = config.OPENAI_COMPLETION_FREQUENCY_PENALTY,
    presencePenalty = config.OPENAI_COMPLETION_PRESENCE_PENALTY,
  }: any) => client.post('/v1/chat/completions', {
    model,
    messages,
    temperature,
    max_tokens: maxTokens,
    frequency_penalty: frequencyPenalty,
    presence_penalty: presencePenalty,
  })

  /**
   * Create text completion
   * @param {any} param0 
   * @returns 
   */
  public createTextCompletion = ({
    model = config.OPENAI_COMPLETION_MODEL,
    prompt,
    temperature = config.OPENAI_COMPLETION_TEMPERATURE,
    top_p,
    maxTokens = config.OPENAI_COMPLETION_MAX_TOKENS,
    frequencyPenalty = config.OPENAI_COMPLETION_FREQUENCY_PENALTY,
    presencePenalty = config.OPENAI_COMPLETION_PRESENCE_PENALTY,
    stop = ['<END>'],
  }: any) => client.post('/v1/completions', {
    model,
    prompt,
    temperature,
    top_p,
    max_tokens: maxTokens,
    frequency_penalty: frequencyPenalty,
    presence_penalty: presencePenalty,
    stop,
  })
}

const client = axios.create({
  baseURL: 'https://api.openai.com',
  headers: {
    'Accept-Encoding': 'gzip, deflate, compress',
    Authorization: `Bearer ${config.OPENAI_API_KEY}`
  }
})

client.interceptors.request.use(option => {
  option.headers.Authorization = `Bearer ${config.OPENAI_API_KEY}`
  return option
})

/**
 * @param {string} model
 */
export function isChatCompletionModel(model: string) {
  if (typeof model !== 'string') { model = String(model) }
  return model.startsWith('gpt-4') || model.startsWith('gpt-3.5')
}

/**
 * Create chat completion
 * @param {any} param0 
 * @returns 
 */
export const createChatCompletion = ({
  model = config.OPENAI_COMPLETION_MODEL,
  messages,
  temperature = config.OPENAI_COMPLETION_TEMPERATURE,
  maxTokens = config.OPENAI_COMPLETION_MAX_TOKENS,
  frequencyPenalty = config.OPENAI_COMPLETION_FREQUENCY_PENALTY,
  presencePenalty = config.OPENAI_COMPLETION_PRESENCE_PENALTY,
}: any) => client.post('/v1/chat/completions', {
  model,
  messages,
  temperature,
  max_tokens: maxTokens,
  frequency_penalty: frequencyPenalty,
  presence_penalty: presencePenalty,
})

/**
 * Create text completion
 * @param {any} param0 
 * @returns 
 */
export const createTextCompletion = ({
  model = config.OPENAI_COMPLETION_MODEL,
  prompt,
  temperature = config.OPENAI_COMPLETION_TEMPERATURE,
  top_p,
  maxTokens = config.OPENAI_COMPLETION_MAX_TOKENS,
  frequencyPenalty = config.OPENAI_COMPLETION_FREQUENCY_PENALTY,
  presencePenalty = config.OPENAI_COMPLETION_PRESENCE_PENALTY,
  stop = ['<END>'],
}: any) => client.post('/v1/completions', {
  model,
  prompt,
  temperature,
  top_p,
  max_tokens: maxTokens,
  frequency_penalty: frequencyPenalty,
  presence_penalty: presencePenalty,
  stop,
})
