import { Anthropic } from './index.mjs';
export function createAnthropic(apiKey, options = {}) {
  return new Anthropic(apiKey);
}
export async function startDeviceCodeFlow() { return null; }
