import { Kimi } from './index.mjs';
export function createKimi(apiKey, options = {}) {
  return new Kimi(apiKey);
}
export async function startDeviceCodeFlow() { return null; }
