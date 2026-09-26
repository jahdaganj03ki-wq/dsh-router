import { Openrouter } from './index.mjs';
export function createOpenrouter(apiKey, options = {}) {
  return new Openrouter(apiKey);
}
export async function startDeviceCodeFlow() { return null; }
