import { Cline } from './index.mjs';
export function createCline(apiKey, options = {}) {
  return new Cline(apiKey);
}
export async function startDeviceCodeFlow() { return null; }
