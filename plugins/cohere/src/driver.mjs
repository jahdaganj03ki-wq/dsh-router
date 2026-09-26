import { Cohere } from './index.mjs';
export function createCohere(apiKey, options = {}) {
  return new Cohere(apiKey);
}
export async function startDeviceCodeFlow() { return null; }
