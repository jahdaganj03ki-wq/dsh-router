import { KiloCode } from './index.mjs';
export function createKiloCode(apiKey, options = {}) {
  return new KiloCode(apiKey);
}
export async function startDeviceCodeFlow() { return null; }
