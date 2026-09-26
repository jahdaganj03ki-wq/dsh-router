import { ClaudeCode } from './index.mjs';
export function createClaudeCode(apiKey, options = {}) {
  return new ClaudeCode(apiKey);
}
export async function startDeviceCodeFlow() { return null; }
