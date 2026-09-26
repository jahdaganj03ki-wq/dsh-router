import { TraeCn } from './index.mjs';
export function createTraeCn(apiKey, options = {}) {
  return new TraeCn(apiKey);
}
export async function startDeviceCodeFlow() { return null; }
