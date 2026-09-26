import { Replicate } from './index.mjs';
export function createReplicate(apiKey, options = {}) {
  return new Replicate(apiKey);
}
export async function startDeviceCodeFlow() { return null; }
