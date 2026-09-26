import { Trae } from './index.mjs';
export function createTrae(apiKey, options = {}) {
  return new Trae(apiKey);
}
export async function startDeviceCodeFlow() { return null; }
