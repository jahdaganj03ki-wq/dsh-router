import { KiroAi } from './index.mjs';
export function createKiroAi(apiKey, options = {}) {
  return new KiroAi(apiKey);
}
export async function startDeviceCodeFlow() { return null; }
