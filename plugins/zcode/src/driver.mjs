import { Zcode } from './index.mjs';
export function createZcode(apiKey, options = {}) {
  return new Zcode(apiKey);
}
export async function startDeviceCodeFlow() { return null; }
