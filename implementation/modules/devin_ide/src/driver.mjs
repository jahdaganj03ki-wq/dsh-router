import { DevinIde } from './index.mjs';
export function createDevinIde(apiKey, options = {}) {
  return new DevinIde(apiKey);
}
export async function startDeviceCodeFlow() { return null; }
