import { CursorIde } from './index.mjs';
export function createCursorIde(apiKey, options = {}) {
  return new CursorIde(apiKey);
}
export async function startDeviceCodeFlow() { return null; }
