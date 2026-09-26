import { Huggingface } from './index.mjs';
export function createHuggingface(apiKey, options = {}) {
  return new Huggingface(apiKey);
}
export async function startDeviceCodeFlow() { return null; }
