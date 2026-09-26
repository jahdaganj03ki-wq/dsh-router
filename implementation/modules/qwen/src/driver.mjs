import { Qwen } from './index.mjs';
export function createQwen(apiKey, options = {}) {
  return new Qwen(apiKey);
}
export async function startDeviceCodeFlow() { return null; }
