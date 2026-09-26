import { NvidiaNim } from './index.mjs';
export function createNvidiaNim(apiKey, options = {}) {
  return new NvidiaNim(apiKey);
}
export async function startDeviceCodeFlow() { return null; }
