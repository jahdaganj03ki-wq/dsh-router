import { XaiGrok } from './index.mjs';
export function createXaiGrok(apiKey, options = {}) {
  return new XaiGrok(apiKey);
}
export async function startDeviceCodeFlow() { return null; }
