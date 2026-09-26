import { Deepseek } from './index.mjs';
export function createDeepseek(apiKey, options = {}) {
  return new Deepseek(apiKey);
}
export async function startDeviceCodeFlow() { return null; }
