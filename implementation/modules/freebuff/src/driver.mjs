import { Freebuff } from './index.mjs';
export function createFreebuff(apiKey, options = {}) {
  return new Freebuff(apiKey);
}
export async function startDeviceCodeFlow() { return null; }
