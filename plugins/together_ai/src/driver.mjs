import { TogetherAi } from './index.mjs';
export function createTogetherAi(apiKey, options = {}) {
  return new TogetherAi(apiKey);
}
export async function startDeviceCodeFlow() { return null; }
