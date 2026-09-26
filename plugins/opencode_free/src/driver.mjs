import { OpencodeFree } from './index.mjs';
export function createOpencodeFree(apiKey, options = {}) {
  return new OpencodeFree(apiKey);
}
export async function startDeviceCodeFlow() { return null; }
