import { Openai } from './index.mjs';
export function createOpenai(apiKey, options = {}) {
  return new Openai(apiKey);
}
export async function startDeviceCodeFlow() { return null; }
