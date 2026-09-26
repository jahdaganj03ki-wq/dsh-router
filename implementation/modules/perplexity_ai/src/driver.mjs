import { PerplexityAi } from './index.mjs';
export function createPerplexityAi(apiKey, options = {}) {
  return new PerplexityAi(apiKey);
}
export async function startDeviceCodeFlow() { return null; }
