import { Monkeycode } from './index.mjs';
export function createMonkeycode(apiKey, options = {}) {
  return new Monkeycode(apiKey);
}
export async function startDeviceCodeFlow() { return null; }
