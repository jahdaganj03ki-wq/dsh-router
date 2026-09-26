import { Codex } from './index.mjs';
export function createCodex(apiKey, options = {}) {
  return new Codex(apiKey);
}
export async function startDeviceCodeFlow() { return null; }
