import { Mistral } from './index.mjs';
export function createMistral(apiKey, options = {}) {
  return new Mistral(apiKey);
}
export async function startDeviceCodeFlow() { return null; }
