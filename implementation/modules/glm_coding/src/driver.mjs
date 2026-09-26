import { GlmCoding } from './index.mjs';
export function createGlmCoding(apiKey, options = {}) {
  return new GlmCoding(apiKey);
}
export async function startDeviceCodeFlow() { return null; }
