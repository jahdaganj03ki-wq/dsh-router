import { GeminiFree } from './index.mjs';
export function createGeminiFree(apiKey, options = {}) {
  return new GeminiFree(apiKey);
}
export async function startDeviceCodeFlow() { return null; }
