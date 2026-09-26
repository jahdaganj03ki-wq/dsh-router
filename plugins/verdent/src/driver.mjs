import { Verdent } from './index.mjs';
export function createVerdent(apiKey, options = {}) {
  return new Verdent(apiKey);
}
export async function startDeviceCodeFlow() { return null; }
