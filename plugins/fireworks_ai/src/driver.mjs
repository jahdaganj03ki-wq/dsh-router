import { FireworksAi } from './index.mjs';
export function createFireworksAi(apiKey, options = {}) {
  return new FireworksAi(apiKey);
}
export async function startDeviceCodeFlow() { return null; }
