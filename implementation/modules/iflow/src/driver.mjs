import { Iflow } from './index.mjs';
export function createIflow(apiKey, options = {}) {
  return new Iflow(apiKey);
}
export async function startDeviceCodeFlow() { return null; }
