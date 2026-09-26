import { Groq } from './index.mjs';
export function createGroq(apiKey, options = {}) {
  return new Groq(apiKey);
}
export async function startDeviceCodeFlow() { return null; }
