import { CloudflareAi } from './index.mjs';
export function createCloudflareAi(apiKey, options = {}) {
  return new CloudflareAi(apiKey);
}
export async function startDeviceCodeFlow() { return null; }
