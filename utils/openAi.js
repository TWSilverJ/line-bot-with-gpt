export function isChatCompletionModel(model) {
  return String(model).startsWith('gpt-4') || String(model).startsWith('gpt-3.5')
}
