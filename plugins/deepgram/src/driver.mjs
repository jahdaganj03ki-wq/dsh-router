import { Deepgram } from './index.mjs';
export function createDeepgram(apiKey, options = {}) {
  return new Deepgram(apiKey);
}
export async function startDeviceCodeFlow() { return null; }
